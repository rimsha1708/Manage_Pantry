// components/PantryForm.js
import { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase/config';

const PantryForm = ({ item, onSubmit, resetForm }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        if (item) {
            setName(item.name);
            setQuantity(item.quantity);
        } else {
            setName('');
            setQuantity('');
        }
    }, [item]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (item) {
            await updateDoc(doc(db, "pantry", item.id), { name, quantity });
        } else {
            await addDoc(collection(db, "pantry"), { name, quantity });
        }
        resetForm(); // Reset form after submission
    };

    const handleDelete = async () => {
        if (item) {
            await deleteDoc(doc(db, "pantry", item.id));
            resetForm(); // Reset form after deletion
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <Button type="submit">{item ? "Update" : "Add"}</Button>
            {item && <Button onClick={handleDelete}>Delete</Button>}
            <Button onClick={resetForm} variant="outlined" color="secondary">
                Cancel
            </Button>
        </form>
    );
};

export default PantryForm;
