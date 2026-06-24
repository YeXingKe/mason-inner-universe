package router

import (
	"github.com/gin-gonic/gin"
	"github.com/mason-inner-universe/server/internal/config"
	"github.com/mason-inner-universe/server/internal/handler"
	"gorm.io/gorm"
)

func New(db *gorm.DB, cfg config.Config) *gin.Engine {
	if cfg.AppEnv == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.New()
	r.Use(gin.Logger(), gin.Recovery())

	r.GET("/health", handler.NewHealthHandler().Check)

	api := r.Group("/api")
	{
		api.GET("/health", handler.NewHealthHandler().Check)

		adminHandler := handler.NewAdminHandler(db)
		admin := api.Group("/admin")
		{
			admin.GET("/profile", adminHandler.Profile)
			admin.GET("/list", adminHandler.List)
		}
	}

	return r
}
