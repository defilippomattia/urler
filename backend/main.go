package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
)

type Service struct {
	Name string `json:"name"`
	URL  string `json:"url"`
}

type Config struct {
	Environments map[string][]Service `json:"environments"`
}

func validateConfig(config Config) error {
	return nil
}

func loadData(dataFilePath string) (Config, error) {
	var db Config

	data, err := os.ReadFile(dataFilePath)
	if err != nil {
		return db, err
	}

	if err := json.Unmarshal(data, &db); err != nil {
		return db, err
	}

	return db, nil
}

func getServices(dataFilePath string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		db, err := loadData(dataFilePath)
		if err != nil {
			http.Error(w, "error loading data", http.StatusInternalServerError)
			log.Println(err.Error())
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// Get the 'env' query parameter
		env := r.URL.Query().Get("env")
		if env == "" {
			http.Error(w, "missing 'env' query parameter", http.StatusBadRequest)
			return
		}

		// Get the services for the specified environment
		services, ok := db.Environments[env]
		if !ok {
			http.Error(w, "environment not found", http.StatusNotFound)
			return
		}

		if err := json.NewEncoder(w).Encode(services); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}
}

func main() {

	var dataFilePath string

	flag.StringVar(&dataFilePath, "config", "", "Path to the JSON config file")
	flag.Parse()

	if dataFilePath == "" {
		fmt.Println("Error: Missing config file path")
		os.Exit(1)
	}

	port := "8058"
	http.HandleFunc("/api/services", getServices(dataFilePath))
	log.Printf("Server running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))

}
