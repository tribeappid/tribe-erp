import { Component, h } from 'preact';
import { LayoutGrid, Elevation } from 'preact-material-components';
import 'preact-material-components/style.css';
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