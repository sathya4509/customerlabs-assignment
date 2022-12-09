import { useState } from 'react';
import Header from './../Header';
import Footer from './../Footer';

import Popup from '../Popup';

import './AddSegment.css';

const AddSegment = ({setShowAddSegment}) => {
    const schemaList = [
        {
            id: 'first_name',
            label: 'First Name',
            category: 'user_traits'
        },
        {
            id: 'last_name',
            label: 'Last Name',
            category: 'user_traits'
        },
        {
            id: 'gender',
            label: 'Gender',
            category: 'user_traits'
        },
        {
            id: 'age',
            label: 'Age',
            category: 'user_traits'
        },
        {
            id: 'account_name',
            label: 'Account Name',
            category: 'group_traits'
        },
        {
            id: 'city',
            label: 'City',
            category: 'group_traits'
        },
        {
            id: 'state',
            label: 'State',
            category: 'group_traits'
        }
    ];
    const [selectedSchema, setSchemaSelected] = useState('');
    const [segmentName, setSegmentName] = useState('');
    const [schemaAllSelected, setSchemaAllSelected] = useState([
        {
            id: 'first_name',
            label: 'First Name',
            category: 'user_traits'
        },
        {
            id: 'account_name',
            label: 'Account Name',
            category: 'group_traits'
        }
    ]);

    // Simple helper function to filter items from an array
    const getUnSelectedSchema = () => {
        const selectedSchemaIds = [];
    
        for (let i = 0; i < schemaAllSelected.length; i++) {
            selectedSchemaIds.push(schemaAllSelected[i].id);        
        }
        
        const unSelectedSchema = [];
        for (let i = 0; i < schemaList.length; i++) {
            if(!selectedSchemaIds.includes(schemaList[i].id)){
                unSelectedSchema.push(schemaList[i]);
            }        
        }
        return unSelectedSchema;
    };

    const addNewSchema = () => {
        if(selectedSchema) {
            const getNewSelectedSchema = schemaList.find(val => val.id === selectedSchema);
            setSchemaAllSelected([...schemaAllSelected, getNewSelectedSchema]);
            setSchemaSelected('');
        }        
    };

    const removeScehma = (el) => {
        const newSchemaSelectedList = schemaAllSelected.filter(val => val.id !== el.id);
        debugger;
        if(!newSchemaSelectedList) {
            setSchemaAllSelected([]);
            return;
        }
        setSchemaAllSelected(newSchemaSelectedList);
    };

    const changedSchemaFromDropdown = (e, i) => {
        const getCurrentSelectedSchema = schemaList.find(val => val.id === e.target.value);
        const schemaSelectedClone = [...schemaAllSelected];
        schemaSelectedClone[i] = getCurrentSelectedSchema;
        setSchemaAllSelected(schemaSelectedClone);
    };

    const saveSegment = () => {
        if(segmentName) {
            const segmentJson = {
                "segment_name": segmentName,
                "schema": []
            };
            for (let i = 0; i < schemaAllSelected.length; i++) {
                segmentJson.schema.push({
                    [schemaAllSelected[i].id]: schemaAllSelected[i].label
                });        
            }
            console.log('New Segment JSON:', segmentJson);
        }
    };
      
    return (
        <Popup>
            <div className="add-segment-panel">
                <Header
                    title="Saving Segment"
                />
                <div className='segment-form'>
                    <div className='segment-name'>
                        <p>Enter the Name of the Segment</p>
                        <p>
                            <input
                                placeholder='Name of the segment'
                                className='text-input'
                                value={segmentName}
                                onChange={(e) => setSegmentName(e.target.value)}
                            />
                        </p>
                        <p>To save your segment, you need to add the schemas to build the query</p>
                    </div>
                    <div className='category-label'>
                        <span className='category-indicator category_user_traits'></span> - User Traits
                        <span className='lbl-group-traits category-indicator category_group_traits'></span> - Group Traits
                    </div>
                    <div className='selected-segments'>                        
                        {
                            schemaAllSelected.length > 0 && schemaAllSelected.map((val, i) => {
                                return <div key={i}>
                                    <span className={`category-indicator category_${val.category}`}></span>
                                    <select
                                        className='select-input'
                                        onChange={(e) => changedSchemaFromDropdown(e, i)}
                                    >
                                        <option value={val.id}>{val.label}</option>
                                        {
                                            getUnSelectedSchema().map(({id, label}) => {
                                                return <option key={id} value={id}>{label}</option>
                                            })
                                        }
                                    </select>
                                    <span
                                        onClick={() => removeScehma(val)}
                                        className='remove-schema'>-</span>
                                </div>
                            })
                        }                        
                    </div>
                    <div className='add-schema'>
                        <select
                            className='select-input'
                            value={selectedSchema}
                            onChange={(e) => {setSchemaSelected(e.target.value)}}
                        >
                            <option value=''>Add schema to segment</option>
                            {
                                getUnSelectedSchema().map(({id, label}) => {
                                    return <option key={id} value={id}>{label}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <span className='btn-add-new-schema' onClick={addNewSchema}>+ Add new schema</span>
                    </div>
                </div>
                <Footer>
                    <div className='add-segment-footer-items'>
                        <button
                            className='bnt-save-segment'
                            onClick={saveSegment}
                        >
                            Save the Segment
                        </button>
                        <button
                            className='btn-cancel-segment'
                            onClick={() => setShowAddSegment(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </Footer>
            </div>
        </Popup>
    );
};

export default AddSegment;