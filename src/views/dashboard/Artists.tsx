import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArtistService from "src/services/artists.service";
import Title from "./Title";
const service = new ArtistService()

export default function Artists() {
    const [rows, setRows] = useState([])
    useEffect(() => {
        service.GetAll({ skip: 0, take: 20, orderBy: '-year_born' }).then(res => {
            setRows(() => res.data.data)
            // console.log(rows)
        })
    }, [])

    // console.log(rows)
    return (
        <React.Fragment>
            <Title>Danh sách Artists</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Year Born</TableCell>
                        <TableCell>Year Died</TableCell>
                        <TableCell align="right">Nationality</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row: any) => (
                        <TableRow key={row._id}>
                            <TableCell>{row._id}</TableCell>
                            <TableCell>{row.first_name}</TableCell>
                            <TableCell>{row.last_name}</TableCell>
                            <TableCell>{row.year_born}</TableCell>
                            <TableCell>{row.year_died}</TableCell>
                            <TableCell align="right">{`$${row.nationality}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}