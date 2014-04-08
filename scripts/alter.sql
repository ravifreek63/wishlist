ALTER TABLE Wish_WishList ALTER COLUMN IsReserved SET  Default 0;
ALTER TABLE Wish_WishList ALTER COLUMN IsAcquired SET  Default 0;
ALTER TABLE Group_Relationships MODIFY RelativeId varchar(36);
