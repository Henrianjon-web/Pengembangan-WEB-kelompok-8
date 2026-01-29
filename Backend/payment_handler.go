package main

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
)

// Struktur data yang diterima dari Frontend
type PaymentRequest struct {
	UserID  int     `json:"user_id"`
	Amount  float64 `json:"amount"`
	Address struct {
		Alamat string `json:"alamat"`
		Kota   string `json:"kota"`
	} `json:"address"`
}

// HandlePayment menggunakan gin.Context agar sesuai dengan main.go
func HandlePayment(c *gin.Context) {
	// 1. Setup konfigurasi Midtrans
	// Pastikan Server Key ini benar (Sandbox)
	midtrans.ServerKey = "SB-Mid-server-p-wvafzbdJazQ6Nb1SeAHqgB" 
	midtrans.Environment = midtrans.Sandbox

	var req PaymentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Data pembayaran tidak valid"})
		return
	}

	// 2. Buat ID Pesanan unik (OrderID)
	orderID := "WARUWU-" + strconv.FormatInt(time.Now().Unix(), 10)

	// 3. Buat Request ke Midtrans Snap
	snapReq := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  orderID,
			GrossAmt: int64(req.Amount),
		},
	}

	// 4. Minta Token dari Midtrans
	snapResp, err := snap.CreateTransaction(snapReq)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat transaksi ke Midtrans"})
		return
	}

	// 5. Kirim Token kembali ke Frontend
	c.JSON(http.StatusOK, gin.H{
		"token": snapResp.Token,
	})
}