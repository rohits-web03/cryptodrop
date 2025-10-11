package models

type User struct {
    UserName  string `gorm:"column:userName;size:20;unique"`
    UserEmail string `gorm:"column:userEmail;size:40;primaryKey"`
    Password  string `gorm:"column:pword;not null" json:"password"`
}

func (User) TableName() string {
    return `"User Info"` // quoted because the table name has a space
}
