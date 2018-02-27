import { Component, h } from 'preact';
import { Card, LayoutGrid, TextField} from 'preact-material-components';
import 'preact-material-components/style.css';
import style from './style';

export default class ProductView extends Component{
    state={
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id ante rhoncus, dictum lacus sit amet, placerat nunc. Etiam aliquet dolor quis sagittis condimentum. Quisque nec tristique lorem. Morbi vitae facilisis orci. Etiam et nunc efficitur, molestie justo eu, placerat felis. Etiam condimentum, velit vitae luctus commodo, ex arcu feugiat nibh, sit amet finibus neque ipsum vel nisi. Vivamus accumsan ut elit in finibus. Suspendisse vel felis ligula. Praesent et nisi urna. Phasellus diam metus, semper at porta ac, maximus vel nisi. Pellentesque metus mauris, feugiat a imperdiet eu, interdum in mauris. Praesent elementum sagittis nunc, at convallis mauris hendrerit sed. Quisque ac dui risus.",
        imgUrl: 'https://dummyimage.com/600x400/000/fff',
        productName: 'Product Name'
    }
    render({},{description, imgUrl, productName}){
        return(
            <LayoutGrid.Cell className={style.kotak} desktopCols="3" tabletCols="4" phoneCols="4">
                <Card>
                    <Card.Primary className={style.contohh}>
                        <Card.MediaItem className={style.panjang} src={imgUrl} x="1dot5"/>
                        <Card.Title large className={style.title}>{productName}</Card.Title>
                        <Card.Media className={style.sub}>
                            <TextField className={style.tempat} textarea value={description}>
                                
                            </TextField>
                        </Card.Media>
                    </Card.Primary>
                    <Card.Actions >
                        <Card.Action >MORE</Card.Action>
                    </Card.Actions>
                </Card>
            </LayoutGrid.Cell>
        )
    }
}