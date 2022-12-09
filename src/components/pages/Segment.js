
import { useState } from 'react';
import AddSegment from './AddSegment';
import './Segment.css';

const Segment = () => {
    const [showAddSegment, setShowAddSegment] = useState(false);
    return (
        <div className="segment-page">
            <button
                className="btn-save-sement"
                onClick={() => setShowAddSegment(true)}
            >
                Save segment
            </button>
            {
                showAddSegment ?
                    <AddSegment
                        setShowAddSegment={setShowAddSegment}
                    />
                : null
            }
        </div>
    );
}

export default Segment;