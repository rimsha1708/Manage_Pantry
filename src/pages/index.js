import { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase/config';
import PantryForm from '../../components/PantryForm';
import SearchBar from '../../components/SearchBar';
import { Container, List, ListItem, ListItemText, Button } from '@mui/material';
import globalStyles from '../styles/globals.css';
import styles from '../styles/Home.module.css';

const Home = () => {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const q = query(collection(db, "pantry"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const itemsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setItems(itemsArray);
        });

        return () => unsubscribe();
    }, []);

    const filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

    const handleSelectItem = (item) => {
        setSelectedItem(item);
    };

    const resetForm = () => {
        setSelectedItem(null);
    };

    return (
        <Container className={styles.container}>
            <h1 className={styles.appName}>Pantry Management</h1> {/* App name in the center */}
            <div className={styles.formContainer}>
                <PantryForm item={selectedItem} onSubmit={resetForm} resetForm={resetForm} />
            </div>
            <div className={styles.searchBarContainer}>
                <SearchBar onSearch={setSearch} />
            </div>
            <List className={styles.list}>
                {filteredItems.map(item => (
                    <ListItem key={item.id} className={styles.listItem}>
                        <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
                        <Button variant="contained" color="primary" onClick={() => handleSelectItem(item)}>
                            Edit
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Home;
