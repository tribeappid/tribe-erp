import { Component, h } from 'preact';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import Elevation from 'preact-material-components/Elevation';
import 'preact-material-components/LayoutGrid/style.css';
import 'preact-material-components/Elevation/style.css';
import style from './style';
import ProductView from './product_view.jsx';

export default class Product extends Component{
    render({}, {}){
        return(
            <div>
                <LayoutGrid align="justify">
                    <LayoutGrid.Inner>
                        <ProductView/>
                        <ProductView/>
                        <ProductView/>
                        <ProductView/>
                        <ProductView/>
                        <ProductView/>
                        <ProductView/>
                        <ProductView/>
                    </LayoutGrid.Inner>
                </LayoutGrid>
            </div>
        )
    }
}