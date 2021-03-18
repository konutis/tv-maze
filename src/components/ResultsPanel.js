import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";

export default function ResultsPanel() {
  const [searchData, setSearchData] = useState([])
  const [resultView, setResultView] = useState('list')
  const params = useParams()

  useEffect(() => {
    window.fetch(`http://api.tvmaze.com/search/shows?q=${params.searchValue}`)
      .then(response => response.json())
      .then((data) => {
        setSearchData(data)
      })
  }, [params.searchValue])

  const history = useHistory()

  const handleShowClick = (id) => {
    history.push(`/shows/${id}`)
  }

  return (
    <div className={`results-container results-container--view-${resultView}`}>
      <div className='results-settings'>
        <button
          className='basic-button basic-button--list'
          onClick={() => { setResultView('list') }}
        >
          List View
        </button>
        <button
          className='basic-button basic-button--grid'
          onClick={() => { setResultView('grid') }}
        >
          Grid View
        </button>
      </div>
      <div className='results-list'>
        {searchData.map((item) => {
          const imageSrc = item.show.image ? item.show.image.medium : '/images/no-img-portrait-text.png'
          return (
            <div key={`results-item-${item.show.id}`} className='results-item'>
              <img
                className='results-item-image'
                src={imageSrc}
                alt={item.show.name}
                onClick={() => handleShowClick(item.show.id)}
              />
              <div className='results-item-inner'>
                <h3 className='results-item-title' onClick={() => handleShowClick(item.show.id)}>
                  {item.show.name}
                </h3>
                {item.show.rating && item.show.rating.average && <p className='results-item-rating'>Rating: {item.show.rating.average}</p>}
                {item.show.genres && <p className='results-item-genres'>Genres: {item.show.genres.map(item => ` ${item}`)}</p>}
                { resultView === 'list' &&
                  <div
                    className='results-item-description'
                    dangerouslySetInnerHTML={{ __html: item.show.summary }}
                  />
                }
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}