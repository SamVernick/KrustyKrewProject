//will import data from database in the future
//for now it will be hard coded

function OrderDetailsTable() {
    return (
        <table className="table-style">
            <thead>
                <tr>
                    <th>Order Detail Number</th>
                    <th>Product</th>
                    <th>Order Number</th>
                    <th>Order Quantity</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Krabby Patty</td>
                    <td>1</td>
                    <td>4</td>
                    <td>5.00</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Salty Sea Dog</td>
                    <td>1</td>
                    <td>4</td>
                    <td>5.00</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Kelp Shake</td>
                    <td>2</td>
                    <td>10</td>
                    <td>20.00</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Krabby Meal</td>
                    <td>3</td>
                    <td>4</td>
                    <td>14.00</td>
                </tr>
            </tbody>
        </table>
    );
}

export default OrderDetailsTable; 