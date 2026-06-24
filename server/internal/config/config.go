package config

import (
	"fmt"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	AppEnv   string
	HTTPHost string
	HTTPPort int

	DBDriver string
	DBDSN    string
}

func Load() Config {
	_ = godotenv.Load()

	port, _ := strconv.Atoi(getEnv("HTTP_PORT", "8080"))

	return Config{
		AppEnv:   getEnv("APP_ENV", "development"),
		HTTPHost: getEnv("HTTP_HOST", "0.0.0.0"),
		HTTPPort: port,
		DBDriver: getEnv("DB_DRIVER", "sqlite"),
		DBDSN:    getEnv("DB_DSN", "storage/miu.db"),
	}
}

func (c Config) Addr() string {
	return fmt.Sprintf("%s:%d", c.HTTPHost, c.HTTPPort)
}

func getEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
