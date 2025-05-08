//will import data from database in the future
//for now it will be hard coded

function ProductsTable() {
    return (
        <table className="table-style">
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Krabby Patty</td>
                    <td>1.25</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Krabby Meal</td>
                    <td>3.50</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Salty Sea Dog</td>
                    <td>1.25</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Kelp Shake</td>
                    <td>2.00</td>
                </tr>
            </tbody>
        </table>
    );
}

export default ProductsTable;