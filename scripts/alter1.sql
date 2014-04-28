alter table Wish_WishList add column ImageId varchar(36);
create table Image_Store (ImageId varchar(36), ImageName varchar(50), `Id` int(11) NOT NULL AUTO_INCREMENT, `CreationTime` timestamp NOT NU    LL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`Id`));
