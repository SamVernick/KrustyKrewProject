//will import data from database in the future
//for now it will be hard coded

function OrdersTable() {
    return (
        <table className="table-style">
            <thead>
                <tr>
                    <th>Order Number</th>
                    <th>Customer ID</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>4</td>
                    <td>10.00</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>1</td>
                    <td>20.00</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>3</td>
                    <td>14.00</td>
                </tr>
            </tbody>
        </table>
    );
}

export default OrdersTable;