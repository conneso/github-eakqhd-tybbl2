import { Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Select, MenuItem, SelectChangeEvent, InputLabel, Box, Collapse, Alert, AlertTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link, useNavigate } from "react-router-dom";
import ArtistService from "src/services/artists.service";
import Title from "./Title";
const service = new ArtistService()

export default function Artists() {
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = useState([])
    const [count, setCount] = useState(0)
    const [success, setSuccess] = useState(-1)
    const [nationalities, setNationalities] = useState(["", "Trung Quốc", "Hàn Quốc", "Nhật Bản", "Lào", "Camphuchia",
        "Vietnam", "Russia", "Norway", "Hungary", "Holland", "France", "USA"])
    const [nationality, setNationality] = React.useState('');
    const [formData, setFormData] = useState({ _id: "", first_name: "", last_name: "", year_born: undefined, year_died: undefined, nationality: "" })
    const navigate = useNavigate()

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        service.Count().then(res => {
            setCount(() => res.data.count)
        })

        service.GetAll({ skip: 0, take: 20, orderBy: '-year_born' }).then(res => {
            setRows(() => res.data.data)
            // console.log(rows)
        })
    }
    const handleNewArtist = () => {
        setFormData({ _id: "", first_name: "", last_name: "", year_born: undefined, year_died: undefined, nationality: "" })

        setNationality("");
        setOpen(true);
    };

    const handleChangeNationality = (event: SelectChangeEvent) => {
        setNationality(event.target.value);
    };

    const handleTextfieldChange = (e: any) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({ ...formData, [name]: value })
    }
    const handleClose = () => {
        setOpen(false);
    };

    const editArtist = (art: any) => {
        setFormData(art)
        setNationality(art.nationality);
        setOpen(true)
    }

    const deleteArtist = (id: string) => {
        service.DeleteArtist(id).then(res => {
            setSuccess(1)
            loadData()
        }).catch(err => {
            //Thông báo không thành công
            setSuccess(0)
        }).finally(() => {
            setTimeout(() => {
                //Ẩn thông báo sau 3s
                setSuccess(-1)
            }, 3000)
        })
    }

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        //Lấy dữ liệu từ form để tạo object
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var art = {
            first_name: data.get("first_name"),
            last_name: data.get("last_name"),
            year_born: data.get("year_born"),
            year_died: data.get("year_died"),
            nationality: nationality
        }
        //Gọi lên api để cập nhật dữ liệu
        //Nếu artist có id (khác blank) thì gọi hàm update
        //Nếu artist không có id thì gọi hàm insert
        let promise = data.get("_id") === "" ? service.AddNewArtist(art) : service.UpdateArtist({ _id: data.get("_id"), ...art });
        promise.then(res => {
            setSuccess(1)
            setOpen(false);
            loadData()
        }).catch(err => {
            //Thông báo không thành công
            setSuccess(0)
        }).finally(() => {
            setTimeout(() => {
                //Ẩn thông báo sau 3s
                setSuccess(-1)
            }, 3000)
        })

    }
    return (
        <React.Fragment>
            <Collapse in={success == 1}>
                <Alert variant="filled" severity="success">
                    <AlertTitle>Thành công</AlertTitle>
                    Thêm dữ liệu thành công
                </Alert>
            </Collapse>
            <Collapse in={success == 0}>
                <Alert variant="filled" severity="error">
                    <AlertTitle>Lỗi</AlertTitle>
                    Có lỗi xảy ra! Hãy thông báo cho admin hỗ trợ.
                </Alert>
            </Collapse>
            <Title>{count} Artists</Title>
            <Button variant="outlined" onClick={handleNewArtist}>Thêm mới</Button>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Id</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Year Born</TableCell>
                        <TableCell>Year Died</TableCell>
                        <TableCell align="right">Nationality</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row: any, idx: number) => (
                        <TableRow key={row._id}>
                            <TableCell>{idx + 1}</TableCell>
                            <TableCell onClick={() => {
                                navigate(`${row._id}`, { replace: true })
                            }}>{row._id}</TableCell>
                            <TableCell>{row.first_name}</TableCell>
                            <TableCell>{row.last_name}</TableCell>
                            <TableCell>{row.year_born}</TableCell>
                            <TableCell>{row.year_died}</TableCell>
                            <TableCell align="right">{`${row.nationality}`}</TableCell>
                            <TableCell align="right">
                                <Button variant="text" onClick={() => {
                                    editArtist(row)
                                }}>Sửa</Button>
                                <Button variant="text" onClick={() => {
                                    deleteArtist(row._id)
                                }}>Xóa</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Thêm mới artist</DialogTitle>
                <Box component="form" onSubmit={handleSave} noValidate sx={{ mt: 1 }}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="first_name"
                            name="first_name"
                            label="First Name"
                            type="text"
                            value={formData.first_name}
                            onChange={handleTextfieldChange}
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            id="last_name"
                            name="last_name"
                            label="Last Name"
                            type="text"
                            value={formData.last_name}
                            onChange={handleTextfieldChange}
                            fullWidth
                            variant="standard"
                        />
                        <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            id="year_born"
                            name="year_born"
                            label="Year Born"
                            type="number"
                            value={formData.year_born}
                            onChange={handleTextfieldChange}
                            variant="standard" />
                        <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            id="year_died"
                            name="year_died"
                            label="Year Died"
                            type="number"
                            value={formData.year_died}
                            onChange={handleTextfieldChange}
                            variant="standard" />
                        <InputLabel id="nationalityLabel">Nationality</InputLabel>
                        <Select
                            labelId="nationalityLabel"
                            id="nationality"
                            name="nationality"
                            margin="dense"
                            value={nationality}
                            onChange={handleChangeNationality}
                            fullWidth
                            variant="standard">
                            {
                                nationalities.map((n) => (
                                    <MenuItem key={n} value={n}>{n}</MenuItem>
                                ))
                            }
                        </Select>

                        <TextField
                            id="_id"
                            name="_id"
                            value={formData._id} type="hidden"></TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit">Save</Button>
                        <Button onClick={handleClose}>Đóng</Button>
                    </DialogActions>
                </Box>

            </Dialog>
        </React.Fragment >
    );
}