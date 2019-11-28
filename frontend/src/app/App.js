import React from 'react';
import './App.css';
import PageHeader from "../commons/header/PageHeader";
import DirectorInfo from "../components/director/info/DirectorInfo";
import DataRow from "../commons/table/DataRow";
import DataTable from "../commons/table/DataTable";

function App() {
    return (
        <DataTable objects=
                       {[
                           {name: "John", age: 30, city: "New York"},
                           {name: "John", age: 30, city: "New York"},
                           {name: "John", age: 30, city: "New York"}
                       ]}
        />
    );
}

export default App;
