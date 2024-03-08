create database sale_website
use sale_website

create table categories(
	id int identity(1,1) primary key not null,
	name varchar(50) not null
)

create table products(
	id int identity(1,1) primary key not null,
	name nvarchar(50) not null,
	image nvarchar(50) not null,
	price float not null, 
	createDate date not null,
	available bit not null,
	categoryId int,
	foreign key(categoryId) references categories(id)
)

create table accounts(
	username varchar(20) primary key not null,
	password nvarchar(50) not null,
	email nvarchar(50) not null,
	fullname nvarchar(50),
	sdt nvarchar(12),
	address nvarchar(100)
)


create table orders(
	id bigint identity(1,1) primary key not null,
	username varchar(20) not null,
	createDate datetime not null,
	address nvarchar(100) not null,
	phoneNumber nvarchar(12) not null,
	foreign key(username) references accounts(username)
)

create table orderDetails(
	id bigint identity(1,1) primary key not null,
	orderId bigint not null,
	productId int not null,
	price float not null,
	quantity int not null,
	foreign key(orderId) references orders(id),
	foreign key(productId) references products(id)
)


create table authorities(
	id int identity(1,1) primary key not null,
	username varchar(20) not null,
	roleId nchar(4),
	foreign key (username) references accounts(username),
	foreign key (roleId) references roles(id)
)

create table roles(
	id nchar(4) primary key not null,
	name nvarchar(15) not null
)

create table feedBacks(
	id int identity(1,1) primary key not null,
	star int not null,
	review nvarchar(255),
	productId int not null,
	username varchar(20) not null,
	foreign key(productId) references products(id),
	foreign key(username) references accounts(username)
)

create table discounts(
	id int identity(1,1) primary key not null,
	name nvarchar(10) not null,
	discount int not null
)
