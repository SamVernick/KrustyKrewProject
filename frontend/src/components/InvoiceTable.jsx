//will import data from database in the future
//for now it will be hard coded

function InvoiceTable() {
    return (
        <table className="table-style">
            <thead>
                <tr>
                    <th>Invoice Number</th>
                    <th>Order ID</th>
                    <th>Customer ID</th>
                    <th>Total</th>
                    <th>Date of Sale</th>
                    <th>Paid</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>4</td>
                    <td>10.00</td>
                    <td>2025-05-01</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>3</td>
                    <td>3</td>
                    <td>14.00</td>
                    <td>2024-06-27</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>2</td>
                    <td>1</td>
                    <td>20.00</td>
                    <td>2023-12-19</td>
                    <td>0</td>
                </tr>
            </tbody>
        </table>
    );
}

export default InvoiceTable;