create database sale_website
use sale_website

create table categories(
id char(4) primary key not null,
name nvarchar(50) not null)


create table products(
id int identity(1,1) primary key not null,
name nvarchar(50) not null,
image nvarchar(50) not null,
price float not null, 
createDate date not null,
available bit not null,
categoryId char(4),
foreign key(categoryId) references categories(id))


create table accounts(
username nvarchar(50) primary key not null,
password nvarchar(50) not null,
fullname nvarchar(50) not null, 
email nvarchar(50) not null,
photo nvarchar(50) not null)

create table orders(
id bigint identity(1,1) primary key not null,
username nvarchar(50) not null,
createDate datetime not null,
address nvarchar(100) not null
foreign key(username) references accounts(username))



create table orderDetails(
id bigint identity(1,1) primary key not null,
orderId bigint not null,
productId int not null,
price float not null,
quantity int not null,
foreign key(orderId) references orders(id),
foreign key(productId) references products(id))

create table authorities(
id int identity(1,1) primary key not null,
username nvarchar(50) not null,
roleId nchar(4),
foreign key ( username) references accounts(username),
foreign key (roleId) references roles(id))


create table roles(
id nchar(4) primary key not null,
name nvarchar(15) not null)
