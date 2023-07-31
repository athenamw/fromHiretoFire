SELECT * 
FROM department
JOIN department_id
On book_prices.id = favorite_books.id
AND book_prices.price = favorite_books.book_price; 