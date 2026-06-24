package database

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/mason-inner-universe/server/internal/config"
	"github.com/mason-inner-universe/server/internal/model"
	"github.com/glebarez/sqlite"
	"gorm.io/driver/mysql"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func Connect(cfg config.Config) (*gorm.DB, error) {
	dialector, err := openDialector(cfg)
	if err != nil {
		return nil, err
	}

	logLevel := logger.Info
	if cfg.AppEnv == "production" {
		logLevel = logger.Warn
	}

	db, err := gorm.Open(dialector, &gorm.Config{
		Logger: logger.Default.LogMode(logLevel),
	})
	if err != nil {
		return nil, fmt.Errorf("open database: %w", err)
	}

	return db, nil
}

func openDialector(cfg config.Config) (gorm.Dialector, error) {
	switch cfg.DBDriver {
	case "sqlite":
		if err := os.MkdirAll(filepath.Dir(cfg.DBDSN), 0o755); err != nil {
			return nil, fmt.Errorf("create sqlite dir: %w", err)
		}
		return sqlite.Open(cfg.DBDSN), nil
	case "mysql":
		return mysql.Open(cfg.DBDSN), nil
	case "postgres":
		return postgres.Open(cfg.DBDSN), nil
	default:
		return nil, fmt.Errorf("unsupported DB_DRIVER: %s", cfg.DBDriver)
	}
}

func AutoMigrate(db *gorm.DB) error {
	return db.AutoMigrate(
		&model.Admin{},
	)
}

func Seed(db *gorm.DB) error {
	var count int64
	if err := db.Model(&model.Admin{}).Count(&count).Error; err != nil {
		return err
	}
	if count > 0 {
		return nil
	}

	return db.Create(&model.Admin{
		Username: "admin",
		Nickname: "Administrator",
		Email:    "admin@example.com",
		Status:   1,
	}).Error
}
