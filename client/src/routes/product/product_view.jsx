import { Component, h } from 'preact';
import Card from 'preact-material-components/Card';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/LayoutGrid/style.css';
import 'preact-material-components/TextField/style.css';
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
                    <img style={`height:150px;`} src={imgUrl}/>
                    <div style={`padding: 10px;`}>
                        <div className={style.title}><a>Judul</a></div>
                        <div className={style.sub}>
                            <a className={style.tempat}>{description}</a>
                        </div>
                        <div style={`margin: 10px 0px;`}>
                            <button className={style.moreButton}>MORE</button>
                        </div>
                    </div>
                </Card>
            </LayoutGrid.Cell>
        )
    }
}