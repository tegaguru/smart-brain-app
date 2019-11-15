import React from 'react';

const Rank = ({name, entries}) => {
    return(
        <div> 
            <div className='white f3'> 
                <p> {`${name}, your current Rank is...`}</p>
            </div>
            <div className='white f1' style= {{marginTop: '-45px' }}> 
                <p> {entries}</p>
            </div>
        </div>
    );
}

export default Rank;