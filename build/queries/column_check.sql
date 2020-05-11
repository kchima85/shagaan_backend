DO
$do$
BEGIN 
IF EXISTS (SELECT column_name FROM information_schema.columns 
    WHERE table_name = '${tableName}' AND column_name = '${column}')
THEN
ELSE 
    ALTER TABLE ${tableName} ADD COLUMN ${column} ${columnWithType};
END IF;
END
$do$