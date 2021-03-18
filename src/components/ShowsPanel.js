import React, { useState, useEffect } from 'react';
import {
  useParams
} from "react-router-dom";

export default function ShowsPanel() {
  const [showData, setShowData] = useState({})
  const [seasonData, setSeasonData] = useState([])
  const [episodesData, setEpisodesData] = useState([])
  const params = useParams()

  useEffect(() => {
    // Main data for the current show
    window.fetch(`http://api.tvmaze.com/shows/${params.id}`)
      .then(response => response.json())
      .then((data) => {
        setShowData(data)
      })

    // Season data for the current show
    window.fetch(`http://api.tvmaze.com/shows/${params.id}/seasons`)
      .then(response => response.json())
      .then((data) => {
        setSeasonData(data)
      })

    // Episodes data for the current show
    window.fetch(`http://api.tvmaze.com/shows/${params.id}/episodes`)
      .then(response => response.json())
      .then((data) => {
        setEpisodesData(data)
      })
  }, [params.id])

  const getEpisodes = (seasonNumber) => {
    return episodesData.filter((episode) => {
      return episode.season === seasonNumber
    }).map((episode) => {
      return (
        <div className='shows-episode' key={`episode-${episode.id}`}>
          <a className='basic-link' href={episode.url}>{episode.name}</a>
        </div>
      )
    })
  }

  const getSeasons = () => {
    return seasonData.map((season) => {
      return (
        <div className='shows-season-item' key={`season-${season.id}`}>
          <h3><a className='basic-link' href={season.url}>Season {season.number}</a></h3>
          {getEpisodes(season.number)}
        </div>
      )
    })
  }

  return (
    <div className='shows-container'>
      <h2 className='shows-name'>{showData.name}</h2>
      <div className='shows-seasons'>
        {getSeasons()}
      </div>
    </div>
  )
}