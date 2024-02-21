# Facture

Facture  est une application pour permettre aux utilisateurs d'entrer les éléments d'un client , renseigner ses achats , et à la fin ils peuvent generer une facture. 

## Installation

1. **Clonez le projet depuis le dépôt GitHub :**

    ```bash
    $ git clone  https://github.com/berol24/ma-facture
    $ cd ma-facture
    ```

2. **Installation du Backend:**

    ```bash
    $ cd  backend
    $ npm install
    $ npm install mysql
    $ npm install express
    $ npm install cors
    $ npm install body-parser
    $ npm install jspdf
    ```

3. **Installation du Frontend:**

    ```bash
    $ cd frontend
    $ npm install
    $ npm install react-router-dom
    $ npm install jspdf
    $ npm install bootstrap
    $ npm install file-saver
    ```

4. **Configuration de la base de données:**

    - Créez une base de données nommée "facturation".
    - Importez le fichier backend/facturation.sql.

## Utilisation

1. **Lancez le Backend :**

    ```bash
    $ cd backend
    $ npm start
    ```

2. **Lancez le Frontend :**

    ```bash
    $ cd frontend
    $ npm start
    ```
