import { useState, useEffect } from "react";
import {
    Box,
    Tabs,
    Tab,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    IconButton,
    Menu,
    MenuItem,
    Modal,
    Button,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomSkeleton from "./CustomSkeleton";
import { toast } from "react-toastify";

const fetchMeals = async () => {
    const { data } = await axios.get("https://dummyjson.com/recipes");
    return data.recipes;
};

const MealTabs = () => {
    const [activeTab, setActiveTab] = useState(0);
    const { data: meals, isLoading, isError } = useQuery({ queryKey: ["meals"], queryFn: fetchMeals });

    const [openModal, setOpenModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState<any>(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);

    const getWeekMeals = () => {
        return JSON.parse(localStorage.getItem("weekMeals") as any) || {
            week1: [],
            week2: [],
            week3: [],
            week4: [],
        };
    };

    const [weekMeals, setWeekMeals] = useState(getWeekMeals());

    useEffect(() => {
        localStorage.setItem("weekMeals", JSON.stringify(weekMeals));
    }, [weekMeals]);

    const handleMenuOpen = (event: any, meal: any) => {
        setAnchorEl(event.currentTarget);
        setOpenMenuId(meal.id);
        setSelectedMeal(meal);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setOpenMenuId(null);
    };

    const handleAddToWeek = (week: any) => {
        if (!selectedMeal) return;

        const storedData = JSON.parse(localStorage.getItem("weekMeals") || "{}");

        const existingMeals = storedData[week] || [];
        const isAlreadyAdded = existingMeals.some((meal: any) => meal.id === selectedMeal.id);

        if (isAlreadyAdded) {
            toast.error("This meal is already added to this week!");
            return;
        }

        const updatedMeals = { ...storedData, [week]: [...existingMeals, selectedMeal] };
        localStorage.setItem("weekMeals", JSON.stringify(updatedMeals));
        toast.success(`Meal added to ${week}`)

        setWeekMeals(updatedMeals);
        setOpenModal(false);
    };

    const handleDeleteMeal = (week: any, mealId: any) => {
        const updatedMeals = {
            ...weekMeals,
            [week]: weekMeals[week].filter((meal: any) => meal.id !== mealId),
        };
        setWeekMeals(updatedMeals);
        localStorage.setItem("weekMeals", JSON.stringify(updatedMeals));
        toast.success(`Meal deleted successfully`)

    };

    return (
        <Box sx={{}}>
            <Box sx={{ width: '100%', paddingX: "100px", bgcolor: 'background.paper', mt: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Tabs value={activeTab} onChange={(_e, newValue) => setActiveTab(newValue)}  variant="scrollable" scrollButtons="auto">
                    <Tab label="All Meals" />
                    <Tab label="Week 1" />
                    <Tab label="Week 2" />
                    <Tab label="Week 3" />
                    <Tab label="Week 4" />
                </Tabs>
            </Box>

            {isLoading && <CustomSkeleton />}
            {isError && <Typography color="error">Failed to load meals. Try again later.</Typography>}

            {activeTab === 0 && meals && (
                <Grid container spacing={6} sx={{ mt: 2, px: 8, background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(231,231,231,1) 100%)", }}>
                    {meals.map((meal: any) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={meal.id} >
                            <Card sx={{ position: "relative", padding: "20px", borderRadius: "20px" }} >
                                <CardMedia className="rounded-lg" component="img" height="140" image={meal.image} alt={meal.name} />
                                <CardContent>
                                    <h2 className="text-xl font-bold mt-3">{meal.name}</h2>
                                    <p color="text.secondary" className=" mt-4">{meal.instructions.join(" ").slice(0, 300)}...</p>

                                    <div className="flex items-center justify-between w-full mt-3">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">Cuisine:</span>
                                            <span>{meal.cuisine}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">Ratings:</span>
                                            <span>{meal.rating}</span>
                                        </div>
                                    </div>

                                    <IconButton sx={{ color: "black", position: "absolute", top: 10, right: 0, padding: 0 }} onClick={(e) => handleMenuOpen(e, meal)}>
                                        <MoreVertIcon />
                                    </IconButton>

                                    <Menu anchorEl={anchorEl} open={openMenuId === meal.id} onClose={handleMenuClose}>
                                        <MenuItem onClick={() => { setOpenModal(true); handleMenuClose(); }}>Add to Week</MenuItem>
                                    </Menu>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {activeTab !== 0 && (
                <Grid container spacing={2} sx={{ mt: 2, px: 8, background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(231,231,231,1) 100%)", }}>
                    {weekMeals[`week${activeTab}`]?.length > 0 ? (
                        weekMeals[`week${activeTab}`].map((meal: any) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={meal.id}>
                                <Card sx={{ position: "relative", padding: "20px", borderRadius: "20px" }}>
                                    <CardMedia className="rounded-lg" component="img" height="140" image={meal.image} alt={meal.name} />



                                    <CardContent>
                                        <h2 className="text-xl font-bold ">{meal.name}</h2>
                                        <p color="text.secondary" className=" mt-4">{meal.instructions.join(" ").slice(0, 300)}...</p>
                                        <div className="flex items-center justify-between w-full mt-3">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">Cuisine:</span>
                                                <span>{meal.cuisine}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">Ratings:</span>
                                                <span>{meal.rating}</span>
                                            </div>
                                        </div>
                                        <IconButton sx={{ position: "absolute", padding: 0, top: 8, right: 4 }} onClick={() => handleDeleteMeal(`week${activeTab}`, meal.id)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography sx={{ mt: 4, mx: "auto", textAlign: "center", width: "100%" }} variant="h6" color="text.secondary">
                            No meals yet
                        </Typography>
                    )}
                </Grid>
            )}

            <Modal open={openModal} onClose={() => setOpenModal(false)} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box sx={{ bgcolor: "white", p: 3, borderRadius: 2, textAlign: "center" }}>
                    <Typography variant="h6">Which week do you want to add this to?</Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
                        <Button variant="contained" onClick={() => handleAddToWeek("week1")}>Week 1</Button>
                        <Button variant="contained" onClick={() => handleAddToWeek("week2")}>Week 2</Button>
                        <Button variant="contained" onClick={() => handleAddToWeek("week3")}>Week 3</Button>
                        <Button variant="contained" onClick={() => handleAddToWeek("week4")}>Week 4</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default MealTabs;
