/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyContext from '../context/MyContext';
import StyledNavBar from '../styles/navbar.styles';

export default function Navbar() {
  const { userStatus, Simulation, setFilterData, bodyref, toggleAlert } =
    React.useContext(MyContext);
  const [showSideMenu, setShowSideMenu] = React.useState(false);
  const [showOptionList, setShowOptionList] = React.useState({
    Categories: false,
    Glasses: false,
    Ingredients: false,
    Alcoholic: false,
  });

  const { Drinks } = Simulation;

  const navigate = useNavigate();

  const filterOptions = [
    {
      title: 'Categories',
    },
    {
      title: 'Glasses',
    },
    {
      title: 'Ingredients',
    },
    {
      title: 'Alcoholic',
      list: ['yes', 'no', 'both'],
    },
  ];

  const capitalizedWord = (word, all = false) => {
    if (all) {
      return word.toUpperCase();
    }

    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const handleSearch = () => {
    console.clear();
    if (1 === 2) {
      toggleAlert('Filter searching');
    }

    const searchData = JSON.parse(localStorage.getItem('filteredDrinks'));

    const results = searchData.map((item) => {
      const newItem = item.split(','); // newItem looks like ['categories', 'wine']
      console.log('newIt[0]', newItem[0], Drinks[0][newItem[0].toLowerCase()]);

      return Drinks.filter(
        (drink) => drink[newItem[0].toLowerCase()] === newItem[1]
      );
    });

    let finalResults = [];

    results.forEach((res) => {
      finalResults = [...finalResults, ...res]; // i'm doing this since finalResults is at first an array of arrays
    });

    /* Since i'm having multiple repeated values, i'll change my array to a set, then spread it 
    or use the Array.from(finalResults) to create a new a array with unique entries */

    console.log('this new set', new Set(finalResults));
    finalResults = Array.from(new Set(finalResults));

    console.log(
      'this searchDAta',
      searchData,
      '\n',
      finalResults,
      '\n',
      results
    );
  };

  // localStorage.clear();

  const handleFilterOptions = (e) => {
    console.clear();

    const localData = JSON.parse(localStorage.getItem('filteredDrinks'));
    if (!localData) {
      localStorage.setItem('filteredDrinks', JSON.stringify([e.target.id]));
    } else if (localData?.includes(e.target.id)) {
      const holder = JSON.parse(localStorage.getItem('filteredDrinks')).filter(
        (item) => item !== e.target.id
      );

      localStorage.setItem('filteredDrinks', JSON.stringify(holder));
    } else {
      localStorage.setItem(
        'filteredDrinks',
        JSON.stringify([...localData, e.target.id])
      );
    }

    setFilterData(JSON.parse(localStorage.getItem('filteredDrinks')));

    // handleSearch();
  };

  const toggleOptionList = (nom) => {
    setShowOptionList(() => ({
      ...showOptionList,
      [nom]: !showOptionList[nom],
    }));
  };

  return (
    <StyledNavBar>
      <div className="navBar-container">
        <button
          className="side_menu_btn"
          type="button"
          onClick={() => setShowSideMenu((prev) => !prev)}
        >
          {showSideMenu ? 'close Filter' : 'open Filter'}
        </button>

        <div className="user_details">
          <p className="user_status">
            myStatus: <span>{userStatus}</span>
          </p>

          <span
            className="profile_section"
            onClick={() => navigate('/profile')}
          >
            <div className="profile_logo" />
            <span>my Profile</span>
          </span>
        </div>

        <div className="side_menu">
          <ul
            className={
              showSideMenu ? 'menu-list active-menu-list' : 'menu-list'
            }
          >
            <li className="result_count">
              showing:{' '}
              <span
                className="count"
                onClick={() => window.scrollTo(0, bodyref.current.offsetTop)}
              >
                {`${Drinks.length} Product${Drinks.length > 1 ? 's' : ''}`}
              </span>
            </li>

            <button className="filter_btn" type="button" onClick={handleSearch}>
              Filter
            </button>

            <form onChange={handleFilterOptions}>
              {filterOptions?.map(({ title }) => (
                <li className="filter_option" key={title}>
                  <h2 onClick={() => toggleOptionList(title)}>{title}</h2>

                  {showOptionList[title] &&
                    (title !== 'Alcoholic'
                      ? Simulation[title].map(({ name }) => {
                          return (
                            <label htmlFor={[title, name]} key={name}>
                              <input type="checkbox" id={[title, name]} />
                              {capitalizedWord(name)}
                            </label>
                          );
                        })
                      : filterOptions.pop().list.map(
                          // i'm using a tenary to check if it's the is alcoholic part already
                          (val) => (
                            <label htmlFor={['Alcoholic', val]} key={val}>
                              <input
                                type="radio"
                                id={['Alcoholic', val]}
                                name={`${val} val`}
                              />
                              {capitalizedWord(val, true)}
                            </label>
                          )
                        ))}
                </li>
              ))}
            </form>
          </ul>
        </div>
      </div>
    </StyledNavBar>
  );
}
