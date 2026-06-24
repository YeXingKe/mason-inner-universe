package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mason-inner-universe/server/internal/model"
	"github.com/mason-inner-universe/server/internal/response"
	"gorm.io/gorm"
)

type AdminHandler struct {
	db *gorm.DB
}

func NewAdminHandler(db *gorm.DB) *AdminHandler {
	return &AdminHandler{db: db}
}

func (h *AdminHandler) Profile(c *gin.Context) {
	var admin model.Admin
	if err := h.db.Order("id asc").First(&admin).Error; err != nil {
		response.Fail(c, http.StatusInternalServerError, 50001, "admin not found")
		return
	}

	response.OK(c, admin)
}

func (h *AdminHandler) List(c *gin.Context) {
	var admins []model.Admin
	if err := h.db.Order("id asc").Find(&admins).Error; err != nil {
		response.Fail(c, http.StatusInternalServerError, 50002, "query admins failed")
		return
	}

	response.OK(c, admins)
}
