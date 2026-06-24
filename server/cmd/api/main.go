package main

import (
	"log"

	"github.com/mason-inner-universe/server/internal/config"
	"github.com/mason-inner-universe/server/internal/database"
	"github.com/mason-inner-universe/server/internal/router"
)

func main() {
	cfg := config.Load()

	db, err := database.Connect(cfg)
	if err != nil {
		log.Fatalf("database connect failed: %v", err)
	}

	if err := database.AutoMigrate(db); err != nil {
		log.Fatalf("database migrate failed: %v", err)
	}

	if err := database.Seed(db); err != nil {
		log.Fatalf("database seed failed: %v", err)
	}

	r := router.New(db, cfg)
	log.Printf("server listening on %s", cfg.Addr())
	if err := r.Run(cfg.Addr()); err != nil {
		log.Fatalf("server stopped: %v", err)
	}
}
