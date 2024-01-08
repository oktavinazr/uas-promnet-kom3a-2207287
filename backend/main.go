package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

type Inventory struct {
	ID          int    `json:"id"`
	NamaBarang  string `json:"nama_barang"`
	Jumlah      int    `json:"jumlah"`
	HargaSatuan int    `json:"harga_satuan"`
	Lokasi      string `json:"lokasi"`
	Deskripsi   string `json:"deskripsi"`
}

var db *sql.DB
var err error

func main() {
	InitDB()
	defer db.Close()
	Routers()
}

func Routers() {
	InitDB()
	defer db.Close()
	log.Println("Starting the HTTP server on port 9080")
	router := mux.NewRouter()
	router.HandleFunc("/api/inventory", GetInventorys).Methods("GET")
	router.HandleFunc("/api/inventory", CreateInventory).Methods("POST")
	router.HandleFunc("/api/inventory/{id}", GetInventory).Methods("GET")
	router.HandleFunc("/api/inventory/{id}", UpdateInventory).Methods("PUT")
	router.HandleFunc("/api/inventory/{id}", DeleteInventory).Methods("DELETE")
	http.ListenAndServe(":9080", &CORSRouterDecorator{router})
}

func InitDB() {
	db, err = sql.Open("mysql", "root:@tcp(localhost:3306)/db_2207287_oktavinazr_uas")
	if err != nil {
		panic(err.Error())
	}
}

func GetInventorys(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var inventoryItems []Inventory

	result, err := db.Query("SELECT id, nama_barang, jumlah, harga_satuan, lokasi, deskripsi FROM inventory_oktavinazr")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()

	for result.Next() {
		var item Inventory
		err := result.Scan(&item.ID, &item.NamaBarang, &item.Jumlah, &item.HargaSatuan, &item.Lokasi, &item.Deskripsi)
		if err != nil {
			panic(err.Error())
		}
		inventoryItems = append(inventoryItems, item)
	}
	json.NewEncoder(w).Encode(inventoryItems)
}

func CreateInventory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	stmt, err := db.Prepare("INSERT INTO inventory_oktavinazr (nama_barang, jumlah, harga_satuan, lokasi, deskripsi) VALUES(?,?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}

	keyVal := make(map[string]interface{}) // Use interface{} to handle different data types
	json.Unmarshal(body, &keyVal)
	nama_barang := keyVal["nama_barang"].(string)
	jumlah := int(keyVal["jumlah"].(float64))             // Convert to integer
	harga_satuan := int(keyVal["harga_satuan"].(float64)) // Convert to integer
	lokasi := keyVal["lokasi"].(string)
	deskripsi := keyVal["deskripsi"].(string)

	// print deskripsi
	fmt.Println(deskripsi)
	_, err = stmt.Exec(nama_barang, jumlah, harga_satuan, lokasi, deskripsi)
	if err != nil {
		panic(err.Error())
	}

	fmt.Fprintf(w, "New inventory item was created")
}

func GetInventory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	result, err := db.Query("SELECT id, nama_barang, jumlah, harga_satuan, lokasi, deskripsi FROM inventory_oktavinazr WHERE id = ?", params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()

	var item Inventory
	for result.Next() {
		err := result.Scan(&item.ID, &item.NamaBarang, &item.Jumlah, &item.HargaSatuan, &item.Lokasi, &item.Deskripsi)
		if err != nil {
			panic(err.Error())
		}
	}
	json.NewEncoder(w).Encode(item)
}

func UpdateInventory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("UPDATE inventory_oktavinazr SET nama_barang=?, jumlah=?, harga_satuan=?, lokasi=?, deskripsi=? WHERE id=?")
	if err != nil {
		panic(err.Error())
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}

	var item Inventory
	if err := json.Unmarshal(body, &item); err != nil {
		panic(err.Error())
	}

	_, err = stmt.Exec(item.NamaBarang, item.Jumlah, item.HargaSatuan, item.Lokasi, item.Deskripsi, params["id"])
	if err != nil {
		panic(err.Error())
	}

	fmt.Fprintf(w, "Inventory item with ID = %s was updated", params["id"])
}

func DeleteInventory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("DELETE FROM inventory_oktavinazr WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}

	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}

	fmt.Fprintf(w, "Inventory item with ID = %s was deleted", params["id"])
}

type CORSRouterDecorator struct {
	R *mux.Router
}

func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers", "Accept, Accept-Language,"+"Content-Type, YourOwnHeader")
	}

	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}
