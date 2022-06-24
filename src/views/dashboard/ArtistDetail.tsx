import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArtistService from "src/services/artists.service";
import Title from "./Title";
const service = new ArtistService()

export default function ArtistDetail() {
    const { artistId } = useParams()
    var [artist, setArtist] = useState({ first_name: 'NA', last_name: 'NA', year_born: '', year_died: '', nationality: '' })

    useEffect(() => {
        //Api để lấy thông tin của artist
        service.FindById(artistId).then(res => {
            setArtist(res.data)
        })
    }, [])
    return (
        <React.Fragment>
            <Title>Artist Details</Title>
            <Title>ID:</Title> {artistId}
            <Title>First Name:</Title> {artist.first_name}
            <Title>Last Name:</Title> {artist.last_name}
            <Title>Born:</Title> {artist.year_born}
            <Title>Died:</Title> {artist.year_died}
            <Title>Nationality:</Title> {artist.nationality}
        </React.Fragment>
    )
}