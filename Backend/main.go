package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// --- MODELS ---

type User struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	Username string `gorm:"unique" json:"username"`
	Email    string `gorm:"unique" json:"email"`
	Password string `json:"-"`
}

type Product struct {
	ID           uint   `gorm:"primaryKey" json:"id"`
	Nama         string `json:"nama"`
	Harga        int    `json:"harga"`
	Deskripsi    string `json:"deskripsi"`
	Kategori     string `json:"kategori"` // 'makanan' atau 'minuman'
	Gambar       string `json:"gambar"`
	IsBestSeller bool   `json:"is_best_seller"`
}

type Address struct {
	ID      uint   `gorm:"primaryKey" json:"id"`
	UserID  uint   `json:"user_id"`
	Alamat  string `json:"alamat"`
	Catatan string `json:"catatan"`
	Kota    string `json:"kota"`
}

var db *gorm.DB

// --- DATABASE SETUP ---

func initDB() {
	dsn := "root:@tcp(127.0.0.1:3306)/db_bakmie_waruwu?charset=utf8mb4&parseTime=True&loc=Local"
	var err error
	db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Gagal koneksi ke database Laragon!")
	}

	// Migrasi semua tabel sekaligus
	db.AutoMigrate(&User{}, &Product{}, &Address{})
}

func main() {
	initDB()
	r := gin.Default()

	// --- MIDDLEWARE CORS ---
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// --- ENDPOINTS: AUTH ---

	r.POST("/api/register", func(c *gin.Context) {
		var input struct {
			Username string `json:"username"`
			Email    string `json:"email"`
			Password string `json:"password"`
		}
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Data tidak valid"})
			return
		}
		hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
		user := User{Username: input.Username, Email: input.Email, Password: string(hashedPassword)}
		if err := db.Create(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Email/Username sudah digunakan"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Registrasi berhasil!"})
	})

	r.POST("/api/login", func(c *gin.Context) {
		var input struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Data tidak valid"})
			return
		}
		var user User
		if err := db.Where("email = ?", input.Email).First(&user).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User tidak ditemukan"})
			return
		}
		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Password salah"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Login berhasil!", "username": user.Username})
	})

	// --- ENDPOINTS: PRODUCTS ---

	r.GET("/api/products", func(c *gin.Context) {
		var products []Product
		db.Find(&products)
		c.JSON(http.StatusOK, products)
	})

	r.POST("/api/products", func(c *gin.Context) {
		var input Product
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Input tidak valid"})
			return
		}
		db.Create(&input)
		c.JSON(http.StatusOK, gin.H{"message": "Produk berhasil ditambah!"})
	})

	r.DELETE("/api/products/:id", func(c *gin.Context) {
		id := c.Param("id")
		db.Delete(&Product{}, id)
		c.JSON(http.StatusOK, gin.H{"message": "Produk berhasil dihapus"})
	})

	// --- ENDPOINTS: ADDRESS ---

	r.POST("/api/address", func(c *gin.Context) {
		var input Address
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Data tidak valid"})
			return
		}
		db.Create(&input)
		c.JSON(http.StatusOK, gin.H{"message": "Alamat berhasil disimpan!"})
	})

	// --- ENDPOINT: MIDTRANS PAYMENT ---
	// Ini akan memanggil fungsi HandlePayment dari file payment_handler.go
	r.POST("/api/pay", HandlePayment)

	r.Run(":8080")
}