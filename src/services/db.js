import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('sensores.db');

db.transaction(tx => {
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS sensor (id INTEGER PRIMARY KEY AUTOINCREMENT, nome_sensor TEXT, dado TEXT);"
    );
})

export default db