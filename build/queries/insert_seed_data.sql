DO
$do$
BEGIN 
IF ((SELECT count(*) FROM ${tableName}) > 5)
THEN
ELSE 
    INSERT INTO ${tableName}
        ${columns}
    values
        ${data};
END IF;
END
$do$