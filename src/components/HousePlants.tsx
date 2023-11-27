import React, { useEffect, useState } from "react";

import plantServise from "../servise/PlantServise";
import PlantDetails from "./PlantDetails";
import { log } from "console";
import "../Design/plantsDesign.css"
import { Alert, Autocomplete, Button, Pagination, Stack, TextField } from "@mui/material";

export default function HousePlants(props: any) {
    // const [plantsData, setPlantsData] = useState<any[]>([]);

    const [open, setOpen] = React.useState(false);
    const [smallArr, setSmallArr] = useState<any[]>([]);
    const [size1, setSize1] = useState(1);
    const countOfPages = 5;
    const plantsData = [
        {
            "Categories": "Dracaena",
            "Latin name": "Dracaena deremensis 'Janet Craig'",
            "id": "53417c12-4824-5995-bce0-b81984ebbd1d",
            "Family": "Liliaceae",
        },
        {
            "Categories": "Palm",
            "Latin name": "Rhapis excelsa",
            "id": "9b97aef1-20a4-5620-af90-7d64dadb414e",
            "Family": "Arecaceae",
        },
        {
            "Categories": "Bromeliad",
            "Latin name": "Aa",
            "id": "9b97aef1-20a4-5620-af90-7d64dadb414e",
            "Family": "Bb",
        },
        {
            "Categories": "Hanging",
            "Latin name": "CC",
            "id": "9b97aef1-20a4-5620-af90-7d64dadb414e",
            "Family": "Dd",
        },
        {
            "Categories": "Aglaonema",
            "Latin name": "Ee",
            "id": "9b97aef1-20a4-5620-af90-7d64dadb414e",
            "Family": "Ff",
        },
        {
            "Categories": "Palm",
            "Latin name": "Gg",
            "id": "9b97aef1-20a4-5620-af90-7d64dadb414e",
            "Family": "Hh",
        },
        {
            "Categories": "Anthurium",
            "Latin name": "Ii",
            "id": "9b97aef1-20a4-5620-af90-7d64dadb414e",
            "Family": "Jj",
        },
        {
            "Categories": "Palm",
            "Latin name": " excelsa",
            "id": "9b97aef1-20a4-5620-af90-7d64dadb414e",
            "Family": "Arecaceae",
        }
    ]

    const [dataCopy, setDataCopy] = useState<any[]>([]);
    const [allDetails, setAllDetails] = useState<any>(null);
    const [categoriesPresented, setCategoriesPresented] = useState<any[] | undefined>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const getAllCategories = async () => {
        await plantServise.GetAllCategories().then(res => { setCategoriesPresented(res) })
    }

    const showMoreDetals = async (plantId: any) => {
        await plantServise.GetById(plantId).then(res => { setAllDetails(res.data) })
        setOpen(true);
    }

    const clear = () => {
        setDataCopy(plantsData);
        setSelectedCategory('')
    }
    const searchByCategory = (str: string) => {

        setSelectedCategory(str)
        console.log({ str });

        var filteredArr = plantsData.filter((plant: any) => {
            return plant['Categories'] === str

        })
        console.log({ filteredArr });

        setDataCopy(filteredArr);

    }
    const searchFirstOrLastName = async (str: string) => {
        console.log({ str });
        var filteredArrFromInput = plantsData.filter((plant: any) => {
            return plant['Family'].includes(str) || plant['Latin name'].includes(str)
        })
        console.log({ filteredArrFromInput });
        await setDataCopy(filteredArrFromInput);

    }
    const handleChangePagination = (event: any, value: any) => {

        setSize1(value);
        let x = dataCopy.slice((value - 1) * countOfPages, value * countOfPages);
        setSmallArr(x);
    };
    useEffect(() => {
        setDataCopy(plantsData)
        //need only if api of getall works
        //  plantServise.GetAllData().then(res => { setPlantsData(res) })
        getAllCategories()

    }, [])
    useEffect(() => {

        if (smallArr.length === 0 && dataCopy.length != 0)
            handleChangePagination(null, size1 - 1)
        console.log("size1", size1);

    }, [smallArr])
    useEffect(() => {


        if (dataCopy.length > 0)
            setSmallArr(dataCopy.slice((size1 - 1) * countOfPages, size1 * countOfPages))
    }, [dataCopy])
    return (
        <div>
            <Button className="clear" onClick={(e: any) => clear()}>clear</Button>
            <input className="searchInput" dir="ltr" placeholder="search" onChange={(e) =>
                searchFirstOrLastName(e.target.value)
            } ></input>
            {smallArr.length > 0 && dataCopy.length > 0 ? (<table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%" >
                <thead >
                    <tr className="trTable">
                        <th scope="col" className="tdGrid"> Latin Name</th>
                        <th scope="col " className="tdGrid"> Family</th>
                        <th scope="col" className="tdGrid"> Category</th>

                        <th scope="col" className="tdGrid"></th>
                    </tr>
                </thead>
                <tbody >
                    {smallArr.map((plant: any) =>
                        <tr >

                            <td className="tdGrid">{plant['Latin name']}</td>
                            <td className="tdGrid">{plant['Family']}</td>
                            <td className="tdGrid">{plant['Categories']}</td>
                            <td className="tdGrid"><Button onClick={() => showMoreDetals(plant.id)}> more details</Button></td>
                        </tr>
                    )}
                </tbody>

            </table>) : (
                <Stack className="noMatch" sx={{ width: "100%" }} spacing={2} >
                    <Alert severity="error">There are no items matching your search</Alert>
                </Stack>
            )}
            <Stack id="paginagion">
                <Pagination
                    count={Math.ceil(dataCopy.length / countOfPages)}
                    color="standard"
                    onChange={handleChangePagination}
                />
            </Stack>
            {categoriesPresented && <Autocomplete
                onChange={(event, value) => {
                    searchByCategory(value)
                }}
                disableClearable
                options={categoriesPresented}
                renderInput={(params) => (
                    <TextField
                        sx={{ width: 300, top: 30, position: "absolute", right: 500 }}
                        {...params}
                        label=" filter by category"

                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />}

            {allDetails && <PlantDetails setOpen={setOpen} open={open} allDetails={allDetails}></PlantDetails>}





        </div>

    )
}






