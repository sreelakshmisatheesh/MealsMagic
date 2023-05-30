import React from 'react';
import '../Styles/home.css';
import { withRouter } from 'react-router-dom';

class QuickSearchItem extends React.Component
{
    handleNavigate = (mealtypeId) => //mid passed
    {
        const locationId = sessionStorage.getItem('locationsessionId'); //to capture the value of location from dropdown for quicksearch click
         if (locationId) {
             this.props.history.push(`/filter?mealtype=${mealtypeId}&location=${locationId}`); //url showing has meal and loc
         } else 
         {
            this.props.history.push(`/filter?mealtype=${mealtypeId}`); //backtick = url passing variable
        }
    }    

    render() 
    {
        const { title, description, picture, mid } = this.props; //parentrln = quicksearch
        return (
            <div className="col-sm-12 col-md-6 col-lg-4" onClick={() => this.handleNavigate(mid)}>
                <div className="tileContainer">
                    <div className="tileComponent1">
                         <img src={`./${picture}`} alt="testing" height="150" width="140" />  {/*should come from db, hence no folder} */}
                    </div>
                    <div className="tileComponent2">
                        <div className="componentHeading">
                            {title}
                        </div>
                        <div className="componentSubHeading">
                            {description}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 


export default withRouter(QuickSearchItem);