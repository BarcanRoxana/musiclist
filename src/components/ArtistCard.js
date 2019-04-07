import React from 'react';
import { Card, CardContent, CardActions, Button } from '@material-ui/core'
import Rating  from 'material-ui-rating'



export const ArtistCard = ({artist, deleteArtist, handleRating}) => (
    <Card className="artist-card">
      <div className="image-container">
        <img src={artist.cardImage} alt={artist.name} />
      </div>
      <CardContent>
        <h3>{artist.name}</h3>
        <p>{artist.listeners} listeners.</p>
      </CardContent>
      <Rating
        value={artist.rating}
        max={5}
        onChange={(e) => handleRating(e, artist)}
      />
      <CardActions>
        <Button size="small" color="primary">
          Share
      </Button>
        <Button size="small" color="secondary" onClick={() => deleteArtist(artist)}>
          Delete
      </Button>
      </CardActions>
    </Card>
)