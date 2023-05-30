import React from 'react';
import '../Styles/home.css';
import QuickSearchItem from './QuickSearchItem';

class QuickSearch extends React.Component {
    render() 
    {
        const { mealtypesData } = this.props; //relation_parent
        return (
            <div>
                <div className="quicksearch">
                    <p className="quicksearchHeading">
                        Immediate Lookups!
                    </p>
                    <p className="quicksearchSubHeading">
                        Discover restaurants by your favourite meal
                    </p>

                    <div className="container-fluid">
                        <div className="row">
                            {mealtypesData.map(item => { //we need dinner , breakfast, lunch etc from db
                                return <QuickSearchItem
                                    title={item.name}  //anyvar = item.dbname
                                    description={item.content}
                                    picture={item.image}
                                    mid={item.meal_type}
                                />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuickSearch;