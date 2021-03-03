# SQL

**Il linguaggio SQL è un linguaggio dichiarativo che permette di creare query con cui interfacciarsi con il DBMS**

### DDL: Data Definition Language
---
**Il DDL viene usato per creare e modificare lo schema del database ed è composto dai comandi ``CREATE``, ``ALTER`` e ``DROP``**
#### comando ``CREATE``
permette di creare database, tabelle e indici
| Sintassi | Descrizione |
|-|-|
|``CREATE DATABASE <nome>`` | Crea un database con il nome inserito |
|``CREATE TABLE <nome> (<colonne>)`` | Crea una tabella |
|``CREATE INDEX <nome> ON <tabella> (<colonna1>, <colonna2>, ...)`` | Crea un'indice di una tabella |
**Sintassi di ``CREATE TABLE``**
```SQL
CREATE TABLE <Nome tabella> (
    <Nome colonna> <tipo> <modificatori>,
    ...
)
```
con il comando ``CREATE TABLE`` si puo creare una tabella e poi aggiungere tutte le colonne.
per ognin colonna e' necessario specificare un **nome** un **tipo** e alcuni **modificatori** opzionali.
|Tipo|Descrizione|Limiti|Esempio|
|-|-|-|-|
|BOOLEAN|Valore logico, Vero o Falso||``True``  ``False``
|CHAR(n)|Stringa di lunghezza n|``1 <= n <= 15000``|``'esempio'``|
|DATE|Data nel formato MM/GG/AA||``2/29/2020``|
|TIME|Ore nel formato HH:MM||``16:20`` ~~nice~~|
|INT(p\)|Intero con precisione(numero di cifre) p|``1<=p<=45``|``42``|
|SMALLINT|Intero con precisione 5|``-32'768 <= x <= 32'767``|``10'000``
|INT|Intero con precisione 10|``-2'147'483'648<= x <= 2'147'483'647``|``420'690'666``|
|DECIMAL(p,s)|Decimale con virgola fissa p precisione, s cifre decimali| ``1<=p<=45`` ``0<=s<=p``|``99.9``(p=3 s=1)  ``100.333``(p=6 s=3)
|REAL|Reale con mantissa di precisione 7|``1E-38 <= abs(x) <= 1E38``|``3.141``
|FLOAT|Reale con mantissa di precisione 15|``1E-308 <= abs(x) <= 1E308``|`2.7182`|
|FLOAT(p\)|Reale con mantissa di precisione p|``1<=p<=45``||

I **modificatori** possono essere usati in due modi:
1. subito dopo la dichiarazione della colonna ``Colonna <tipo>`` **``UNIQUE``**
2. alla fine in righe isolate **``Unique``**``(Colonna)``

|Modificatore|Descrizione|Sintassi normale|Sintassi linea isolata|
|-|-|-|-|
|UNIQUE|Tutti i valori nella colonna devono essere diversi|``Colonna <tipo> UNIQUE``|``UNIQUE(Colonna)``|
|NOT NULL|I valori della colonna non possono essere NULL|``Colonna <tipo> NOT NULL``|``NOT NULL(Colonna)``|
|PRIMARY KEY|ha l'effetto di UNIQUE e NOT NULL identifica unicamente una colonna della tabella|``Colonna <tipo> PRIMARY KEY``|``PRIMARY KEY(Colonna)``|
|REFERENCES|impone l'integrita' referenziale sulla collonna rispetto alla colonna ``<col>`` della tabella ``<tabella>`` |``Colonna <tipo> REFERENCES <tabella>(<col>)``|``FOREIGN KEY (Colonna) REFERENCES <tabella>(<col>)`` 
##### Esempio
```SQL
CREATE TABLE Persone (
    IDPersona int PRIMARY KEY,
    CodiceFiscale char(16) UNIQUE NOT NULL,
    Nome char(255) NOT NULL,
    Cognome CHAR(255),
    DataDiNascita DATE,
    Eta INT(3),
    
    NOT NULL(Cognome)
);
```

#### comando ``ALTER``
alter permette di selezionare una tabella per poi essere modificata con i comandi ``ADD`` ``DROP``
``ALTER TABLE <tabella>`` per selezionare la tabella
In seguito si puo' scrivere:
* ``ADD ...`` per aggiungere una colonna dove la sintassi e' uguale a quella di ``CREATE TABLE``
* ``DROP <colonna>`` per rimuovere una colonna e i suoi dati
##### Esempio
```SQL
ALTER TABLE tabella
ADD nuovaColonna INT NOT NULL;

ALTER TABLE tabella
DROP daRimuovere
```

###  QL: Query Language
---
**il QL permette di interrogare il database leggendo i dati presenti al suo interno.
esso consiste di un solo comando ``SELECT`` ma che presenta molte funzionalita'**

il comando ``SELECT`` utilizza la sintassi:
```SQL
SELECT [DISTINCT] <colonna1>, <colonna2>, ...
FROM <tabella> [INNER JOIN <tabella2>]
[WHERE <condizione>]
[ORDER BY <colonneOrder>]
[
    GROUP BY <colonnaDaRaggruppare
    [HAVING <condizioneGruppo>]
]
```
dove ci sono le parentesi quadre [] voul dire che quello al loro interno è opzionale
**Sintassi clausola ``SELECT``**
la clausola ``SELECT`` permette di selezionare le colonne che si vogliono ottenere scrivendo la lista, se al posto della lista si scrive ``*`` si selezionaranno tutte le colonne. Inoltre è possibile usare la clausola ``DISTINCT`` per selezionare le colonne differenti
``SELECT DISTINCT *`` selezionerà tutte le colonne differenti
``SELECT nome, cognome`` selezionerà le colonne nome e congome
**Sintassi clausola ``FROM``**
la clausola ``FROM`` permette di selezionare la tabella o le tabelle da cui si vuole fare la selezione
Per congiugere due tabelle è possible utilizzare il comando ``JOIN``
TODO: inner join outer join
``FROM tab1`` i dati saranno presi da tab1
``FROM tab1 INNER JOIN tab2`` i dati sono presi dall'uninone delle tabelle tab1 e tab2
**Sintassi clausola ``WHERE``**
la clausola ``WHERE`` permette di imporre una condizione ai risultati, questa condizione può utilizzare i simboli aritmetici ``= > >= <> < <=`` o le clausole ``IS NULL``, ``LIKE`` ``BETWEEN x AND y``
più condizioni possono essere congiunte usando ``AND`` e ``OR``
una condizione può essere negata usando ``NOT``
la clausola ``LIKE`` permette di confrontare il valore di una stringa con un'altra che contiene dei caratteri jolly (wildcard)
|Carattere SQL|Carattere Access|Descrizione|Esempio|
|-|-|-|-|
|``_``|``?``|Qualsiasi carattere|``_go`` -> ago, Ugo|
|``%``|``*``|Indica una sequenza di 0 o più caratteri|``%le`` -> le, male, animale|
##### Esempi
```SQL
WHERE nome="Michere" -- nome deve essere uguale a Michele
WHERE prezzo < 3.5 -- prezzo deve essere minore di 3.5
WHERE prezzo BETWEEN 10 AND 15 -- prezzo compreso tra 10 e 15
WHERE nome LIKE "A%" -- nomi che iniziano con la A
```
**Sintassi clausola ``ORDER BY``**
la clausola ``ORDER BY`` permette di riordinare i risultati di una query secondo la colonna selezionata, è possibile selezionare più colonne nel caso ci siano elementi uguali nella primo colonna ed è possibile cambiare l'ordine usando ``ASC`` ascendente e ``DESC``
``ORDER BY colonna1`` i dati saranno riordinati secondo colonna1
``ORDER BY categoria, sottocategoria`` ordina prima la categoria e se due categorie sono uguali utilizza la sottocategoria
**Sintassi clausola ``GROUP BY``**
la clausola ``GROUP BY`` raggruppare righe aventi lo stesso valore in un capo, questa clausola deve essere utilizzata in combinazione di una funzione di aggregazione.
la clausola ``GROUP BY`` può essere usata su più colonne e verranno raggruppate tutte le combinazioni delle due colonne, inoltre è possibile usare la clausola ``HAVING`` dove in seguito si può specificare una condizione che i gruppi devono soddisfare. La clausola ``WHERE`` invece indichera una condizione che andrà a restringere gli elementi che dovranno essere raggruppati. 
##### Esempio
```SQL
SELECT categoria, COUNT(*)
FROM prodotti
GROUP BY categoria
WHERE COUNT(*) > 10
```

### Funzioni di aggregazione
Le funzioni di aggregazione permettono di esegure un'operazione su tutta una colonna permettendo di aggregare i dati in un solo valore
Queste funzioni vengo usate necessariamente in combinazione alla clausola ``GROUP BY`` come visto nell'esempio precedente
|Funzione|Descrizione|
|-|-|
|``COUNT(*)``|conta il numero di righe in una tabella|
|``COUNT(<colonna>)``|conta il numero di righe non nulle di una colonna|
|``SUM(<colonna>)``|calcola la somma degli elementi in una colonna|
|``AVG(<colonna>)``|calcola la media degli elementi in una colonna|
|``MAX(<colonna>)``|trova il valore massimo di una colonna|
|``MIN(<colonna>)``|trova il valore minimo di una colonna|

### DML: Data Manipulation Language
---
**il DML permette di modificare i dati all'interno di una tabella preservandone lo schema.
esso e' composto dai comandi ``INSERT``, ``UPDATE`` e ``DELETE``**
#### comando ``Insert``
il comando insert permette di inserire dati all'interno di una ``tabella`` selezionando le ``<Colonne>`` che si vogliono inserire (se una colonna e' NOT NULL bisogna specificarla per forza) e i valori che assumeranno
``INSERT INTO <tabella> (<Colonne>) VALUES (<Valori>)``
##### Esempio
|ID|nome|cognome|
|-|-|-|
|102|Samuele|Cerea|
Per arrivare alla tabella precedente da una tabella vuota si puo' usare la query
```SQL
INSERT INTO tabella (ID, nome, cognome)
VALUES (102, 'Samuele', 'Cerea');
```
#### comando ``Update``
il comando update permette di aggiornare una colonna ``<colonna>`` in una tabella ``<tabella>`` ad un nuovo valore ``<nVal>`` se una condizione opzionale e' vera
``UPDATE <tabella> SET <colonna> = <nVal> [WHERE ID = 2]``

Nella clausola set si possono mettere piccole espressioni matematiche per esempio la query
```SQL
UPDATE tabella
SET ID = ID + 10
```
incrementera' tutti gli ID di 10
##### Esempio
considerando la tabella precedente (Quella del comando insert) se si vuole cambiare Samuele in Enrico il famoso chef 'Chicco' si puo' usere la query
```SQL
UPDATE tabella
SET nome = 'Enrico'
WHERE ID = 102
```
in questo caso la clausola ``WHERE`` poteva essere omessa, ma se la tabella avesse contenuto piu' di una riga tutti i nomi sarebbero stati cambiati in Enrico
#### comando ``Delete``
il comando delete permette di cancellare righe da una tabella ``<tabella>`` se una condizione opzionale viene soddisfatta
``DELETE FROM <tabella> [WHERE ID < 10]``
se la query `DELETE FROM` viene usata senza una clausola `WHERE` verrano eliminati tutte le righe, ma verra preservata la struttura
##### Esempio
|ID|Val|
|-|-|
|0|2|
|1|3|
|2|8|
|3|5|
|4|11|
Se eseguiamo la query seguente rimouveremo le righe dove ``Val`` e' minore di 4
```SQL
DELETE FROM tabella
WHERE Val < 4
```
Ottenendo
|ID|Val|
|-|-|
|2|8|
|3|5|
|4|11|

### DCL?: Data Control Language
---
**il DCL permette di gestire i permessi degli utenti del database permettendo di togliere o aggiungere permessi agli utenti attraverso i comandi ``GRANT`` e ``REVOKE``**

i permessi che si possono fornire sono:
|Nome|Descrizione|
|-|-|
|``ALTER``|permesso di poter modificare lo schema del database|
|``DELETE``|permesso di eliminare righe (comando ``DELETE``)|
|``INDEX``|permesso di creare un'indice (comando ``CREATE INDEX``)|
|``INSERT``|permesso di inserire nuove righe (comando ``INSERT``)|
|``SELECT``|permesso di leggere i dati nella tabella(comando ``SELECT``)|
|``UPDATE``|permesso di modificare il valore dei dati(comando ``UPDATE``)|
|``ALL``|tutti i permessi|

**Sintassi comandi ``GRANT`` e ``REVOKE``**
``GRANT`` e ``REVOKE`` sono interscambiabili dove uno concede un permesso e l'altro lo rimuove
è necessario specificare una tabella in cui si vogliono modificare i permessi e una lista di utenti che subiranno la modifica dei loro permessi, inoltre è possibile specificare una lista delle colonne in cui si vogliono modificare i permessi
```SQL
GRANT UPDATE [(<colonna1>, <colonna2>, ...)]
ON <tabella>
TO <user1>, <user2>, ...
```
