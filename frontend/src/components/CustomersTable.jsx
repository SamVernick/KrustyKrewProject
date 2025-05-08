//will import data from database in the future
//for now it will be hard coded

function CustomersTable() {
    return (
        <table className="table-style">
            <thead>
                <tr>
                    <th>Customer ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Total Money Spent</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mermaid</td>
                    <td>Man</td>
                    <td>0.00</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Barnacle</td>
                    <td>Boy</td>
                    <td>0.00</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Patrick</td>
                    <td>Star</td>
                    <td>0.00</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Bubble</td>
                    <td>Bass</td>
                    <td>0.00</td>
                </tr>
            </tbody>
        </table>
    );
}

export default CustomersTable;