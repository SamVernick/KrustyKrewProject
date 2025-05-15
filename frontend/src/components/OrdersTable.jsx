//will import data from database in the future
//for now it will be hard coded

function OrdersTable() {
    return (
        <table className="table-style">
            <thead>
                <tr>
                    <th>Order Number</th>
                    <th>Customer Name</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Bubble Bass</td>
                    <td>10.00</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Mermaid Man</td>
                    <td>20.00</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Patrick Star</td>
                    <td>14.00</td>
                </tr>
            </tbody>
        </table>
    );
}

export default OrdersTable;