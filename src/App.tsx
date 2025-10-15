import React, { useState, useEffect } from 'react';
import { BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Clock, TrendingUp, AlertCircle, Mic, FileText, BarChart3, ArrowRight, ChevronDown, ChevronRight, Info, Plus, Trash2, HelpCircle } from 'lucide-react';

const TaxProcessAnalyzer = () => {
  // ... HIER DEN KOMPLETTEN CODE EINFÜGEN

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Clock, TrendingUp, AlertCircle, Mic, FileText, BarChart3, ArrowRight, ChevronDown, ChevronRight, Info, Plus, Trash2, HelpCircle } from 'lucide-react';

const TaxProcessAnalyzer = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [inputMethod, setInputMethod] = useState(null);
  const [hierarchy, setHierarchy] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const [newActivityText, setNewActivityText] = useState({});
  const [hoveredInfo, setHoveredInfo] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [newCategoryText, setNewCategoryText] = useState({ produktiv: '', verwaltung: '' });
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [activeTab, setActiveTab] = useState('beschreibung');
  const [mermaidView, setMermaidView] = useState('grafik');
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [addCategoryArea, setAddCategoryArea] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportName, setExportName] = useState('');
  const [versionHistory, setVersionHistory] = useState([]);
  const [versionModalOpen, setVersionModalOpen] = useState(false);

  useEffect(() => {
    initializeDefaultData();
  }, []);

  const initializeDefaultData = () => {
    const data = {
      produktiv: {
        name: 'Mandantenauftrag',
        color: '#10b981',
        categories: {
          'Finanzbuchhaltung': {
            name: 'Finanzbuchhaltung',
            benchmark: 14,
            ist: 0,
            description: 'Laufende Buchhaltung, Kontierung, Abstimmungen',
            children: {
              'Fibu Einrichtungsarbeiten': { name: 'Fibu Einrichtungsarbeiten', ist: 0, isLeaf: true },
              'Fibu auf Vorschussbasis': { name: 'Fibu auf Vorschussbasis', ist: 0, isLeaf: true },
              'Fibu Zeithonorar': { name: 'Fibu Zeithonorar', ist: 0, isLeaf: true },
              'Fibu Sonderarbeiten': { name: 'Fibu Sonderarbeiten', ist: 0, isLeaf: true }
            }
          },
          'Jahresabschlüsse inkl. Betrieblicher Steuererklärungen': {
            name: 'Jahresabschlüsse inkl. Betrieblicher Steuererklärungen',
            benchmark: 10,
            ist: 0,
            description: 'Bilanzen, GuV, betriebliche Steuern',
            children: {
              'JA Bilanzierer': { name: 'JA Bilanzierer', ist: 0, isLeaf: true },
              'JA EÜR': { name: 'JA EÜR', ist: 0, isLeaf: true }
            }
          },
          'Lohnbuchhaltung': {
            name: 'Lohnbuchhaltung',
            benchmark: 4,
            ist: 0,
            description: 'Lohnabrechnungen, Sozialversicherung',
            children: {
              'Lohn Einrichtungsarbeiten': { name: 'Lohn Einrichtungsarbeiten', ist: 0, isLeaf: true },
              'Lohn Grundleistungen': { name: 'Lohn Grundleistungen', ist: 0, isLeaf: true },
              'LStAP': { name: 'LStAP', ist: 0, isLeaf: true },
              'DRV-Prüfung': { name: 'DRV-Prüfung', ist: 0, isLeaf: true },
              'Lohn Sonderarbeiten': { name: 'Lohn Sonderarbeiten', ist: 0, isLeaf: true }
            }
          },
          'Private Steuererklärungen': {
            name: 'Private Steuererklärungen',
            benchmark: 4,
            ist: 0,
            description: 'ESt, Feststellungen, ErbSt',
            children: {
              'ESt ohne weitere Leistungen': { name: 'ESt ohne weitere Leistungen', ist: 0, isLeaf: true },
              'ESt mit weiteren Leistungen': { name: 'ESt mit weiteren Leistungen', ist: 0, isLeaf: true },
              'Feststellungserklärungen': { name: 'Feststellungserklärungen', ist: 0, isLeaf: true },
              'ErbSt/Schenkungsteuer': { name: 'ErbSt/Schenkungsteuer', ist: 0, isLeaf: true }
            }
          },
          'Prüfungen': {
            name: 'Prüfungen',
            benchmark: 1,
            ist: 0,
            description: 'Bescheidprüfung, Einsprüche',
            children: {
              'Bescheidprüfung': { name: 'Bescheidprüfung', ist: 0, isLeaf: true },
              'Außenprüfung': { name: 'Außenprüfung', ist: 0, isLeaf: true },
              'Einsprüche': { name: 'Einsprüche', ist: 0, isLeaf: true }
            }
          },
          'Beratungsleistungen': {
            name: 'Beratungsleistungen',
            benchmark: 2,
            ist: 0,
            description: 'Laufende und Sonderberatung',
            children: {
              'Laufende Beratung': { name: 'Laufende Beratung', ist: 0, isLeaf: true },
              'Sonderberatung': { name: 'Sonderberatung', ist: 0, isLeaf: true }
            }
          }
        }
      },
      verwaltung: {
        name: 'Verwaltungsauftrag',
        color: '#f59e0b',
        categories: {
          'Abwesenheit': {
            name: 'Abwesenheit',
            benchmark: 17,
            ist: 0,
            description: 'Urlaub, Krankheit, Berufsschule',
            children: {
              'Urlaub': { name: 'Urlaub', ist: 0, isLeaf: true },
              'Krankheit': { name: 'Krankheit', ist: 0, isLeaf: true },
              'Berufsschule': { name: 'Berufsschule', ist: 0, isLeaf: true }
            }
          },
          'Aus- und Weiterbildung': {
            name: 'Aus- und Weiterbildung',
            benchmark: 8,
            ist: 0,
            description: 'Fortbildungen, Azubi-Ausbildung',
            children: {
              'Fortbildung': { name: 'Fortbildung', ist: 0, isLeaf: true },
              'Azubi-Ausbildung': { name: 'Azubi-Ausbildung', ist: 0, isLeaf: true }
            }
          },
          'Kanzlei-Verwaltung': {
            name: 'Kanzlei-Verwaltung',
            benchmark: 40,
            ist: 0,
            description: 'Sekretariat, Eigenverwaltung, Organisation',
            children: {
              'Sekretariat': { name: 'Sekretariat', ist: 0, isLeaf: true },
              'Eigenverwaltung': { name: 'Eigenverwaltung', ist: 0, isLeaf: true },
              'Kanzleiorganisation': { name: 'Kanzleiorganisation', ist: 0, isLeaf: true },
              'EDV': { name: 'EDV', ist: 0, isLeaf: true }
            }
          }
        }
      }
    };
    setHierarchy(data);
  };

  const toggleExpand = (path) => {
    setExpandedItems(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const calculateTotal = (obj) => {
    if (!obj) return 0;
    let total = obj.ist || 0;
    if (obj.children) {
      Object.values(obj.children).forEach(child => {
        total += calculateTotal(child);
      });
    }
    return total;
  };

  const calculateAreaTotal = (area) => {
    if (!hierarchy) return 0;
    let total = 0;
    Object.values(hierarchy[area].categories).forEach(cat => {
      total += cat.ist || 0;
      if (cat.children) {
        Object.values(cat.children).forEach(child => {
          total += calculateTotal(child);
        });
      }
    });
    return total;
  };

  const getOverallTotal = () => {
    if (!hierarchy) return 0;
    return calculateAreaTotal('produktiv') + calculateAreaTotal('verwaltung');
  };

  const updateCategoryValue = (area, catKey, value) => {
    setHierarchy(prev => {
      const newHierarchy = JSON.parse(JSON.stringify(prev));
      newHierarchy[area].categories[catKey].ist = Math.max(0, Math.min(100, parseFloat(value) || 0));
      return newHierarchy;
    });
  };

  const updateItemValue = (area, catKey, path, value) => {
    setHierarchy(prev => {
      const newHierarchy = JSON.parse(JSON.stringify(prev));
      const parsedValue = Math.max(0, Math.min(100, parseFloat(value) || 0));
      
      let target = newHierarchy[area].categories[catKey];
      
      for (let i = 0; i < path.length; i++) {
        if (target.children && target.children[path[i]]) {
          target = target.children[path[i]];
        }
      }
      
      target.ist = parsedValue;
      return newHierarchy;
    });
  };

  const updateProcessDetails = (area, catKey, path, field, value) => {
    setHierarchy(prev => {
      const newHierarchy = JSON.parse(JSON.stringify(prev));
      
      let target;
      if (path.length === 0) {
        target = newHierarchy[area].categories[catKey];
      } else {
        target = newHierarchy[area].categories[catKey];
        for (let i = 0; i < path.length; i++) {
          if (target.children && target.children[path[i]]) {
            target = target.children[path[i]];
          }
        }
      }
      
      if (!target.details) {
        target.details = {};
      }
      target.details[field] = value;
      
      return newHierarchy;
    });
  };

  const getProcessDetails = (process) => {
    if (!process) return {
      beschreibung: '',
      soll: '',
      huerden: '',
      aufwand: 5,
      nutzen: 5,
      prioritaet: 5,
      notizen: '',
      mermaidCode: '',
      systeme: '',
      stakeholder: '',
      anbieter: []
    };
    return {
      beschreibung: process.details?.beschreibung || '',
      soll: process.details?.soll || '',
      huerden: process.details?.huerden || '',
      aufwand: process.details?.aufwand || 5,
      nutzen: process.details?.nutzen || 5,
      prioritaet: process.details?.prioritaet || 5,
      notizen: process.details?.notizen || '',
      mermaidCode: process.details?.mermaidCode || '',
      systeme: process.details?.systeme || '',
      stakeholder: process.details?.stakeholder || '',
      anbieter: process.details?.anbieter || []
    };
  };

  const getCurrentProcess = () => {
    if (!selectedProcess || !hierarchy) return null;
    
    const { area, catKey, path } = selectedProcess;
    
    if (!path || path.length === 0) {
      return hierarchy[area].categories[catKey];
    } else {
      let target = hierarchy[area].categories[catKey];
      for (let i = 0; i < path.length; i++) {
        if (target.children && target.children[path[i]]) {
          target = target.children[path[i]];
        }
      }
      return target;
    }
  };

  const deleteItem = (area, catKey, path) => {
    setHierarchy(prev => {
      const newHierarchy = JSON.parse(JSON.stringify(prev));
      
      if (path.length === 0) {
        delete newHierarchy[area].categories[catKey];
      } else {
        let target = newHierarchy[area].categories[catKey];
        
        for (let i = 0; i < path.length - 1; i++) {
          if (target.children && target.children[path[i]]) {
            target = target.children[path[i]];
          }
        }
        
        if (target.children) {
          delete target.children[path[path.length - 1]];
        }
      }
      
      return newHierarchy;
    });
  };

  const renameItem = (area, catKey, path, newName) => {
    if (!newName || !newName.trim()) return;
    
    setHierarchy(prev => {
      const newHierarchy = JSON.parse(JSON.stringify(prev));
      
      if (path.length === 0) {
        const cat = newHierarchy[area].categories[catKey];
        delete newHierarchy[area].categories[catKey];
        newHierarchy[area].categories[newName] = { ...cat, name: newName };
      } else {
        let target = newHierarchy[area].categories[catKey];
        
        for (let i = 0; i < path.length - 1; i++) {
          if (target.children && target.children[path[i]]) {
            target = target.children[path[i]];
          }
        }
        
        if (target.children && target.children[path[path.length - 1]]) {
          const item = target.children[path[path.length - 1]];
          delete target.children[path[path.length - 1]];
          target.children[newName] = { ...item, name: newName };
        }
      }
      
      return newHierarchy;
    });
    
    setEditingItem(null);
  };

  const addNewItem = (area, catKey, path) => {
    const key = path.length === 0 ? `${area}_${catKey}` : `${area}_${catKey}_${path.join('_')}`;
    const itemName = newActivityText[key];
    
    if (!itemName || !itemName.trim()) return;
    
    setHierarchy(prev => {
      const newHierarchy = JSON.parse(JSON.stringify(prev));
      
      if (path.length === 0) {
        if (!newHierarchy[area].categories[catKey].children) {
          newHierarchy[area].categories[catKey].children = {};
        }
        newHierarchy[area].categories[catKey].children[itemName] = {
          name: itemName,
          ist: 0,
          isLeaf: true,
          isCustom: true
        };
      } else {
        let target = newHierarchy[area].categories[catKey];
        
        for (let i = 0; i < path.length; i++) {
          if (target.children && target.children[path[i]]) {
            target = target.children[path[i]];
          }
        }
        
        if (!target.children) {
          target.children = {};
          target.isLeaf = false;
        }
        
        target.children[itemName] = {
          name: itemName,
          ist: 0,
          isLeaf: true,
          isCustom: true
        };
      }
      
      return newHierarchy;
    });
    
    setNewActivityText(prev => ({ ...prev, [key]: '' }));
    setExpandedItems(prev => ({ ...prev, [key]: true }));
  };

  const addNewCategory = (area) => {
    const categoryName = newCategoryText[area];
    
    if (!categoryName || !categoryName.trim()) return;
    
    setHierarchy(prev => {
      const newHierarchy = JSON.parse(JSON.stringify(prev));
      
      newHierarchy[area].categories[categoryName] = {
        name: categoryName,
        benchmark: 0,
        ist: 0,
        description: '',
        children: {},
        isCustom: true
      };
      
      return newHierarchy;
    });
    
    setNewCategoryText(prev => ({ ...prev, [area]: '' }));
    
    const pathKey = `${area}_${categoryName}`;
    setExpandedItems(prev => ({ ...prev, [pathKey]: true }));
  };

  const exportData = () => {
    setExportModalOpen(true);
  };

  const executeExport = () => {
    if (!exportName.trim()) {
      alert('Bitte geben Sie einen Namen für den Export ein.');
      return;
    }

    const now = new Date();
    const exportObj = {
      version: '1.0',
      name: exportName.trim(),
      exportDate: now.toISOString(),
      exportDateFormatted: now.toLocaleString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      data: hierarchy
    };
    
    setVersionHistory(prev => [...prev, exportObj]);
    
    const dataStr = JSON.stringify(exportObj, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = `${exportName.trim().replace(/[^a-z0-9]/gi, '_')}_${now.toISOString().split('T')[0]}_${now.getHours()}-${now.getMinutes()}.json`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setExportModalOpen(false);
    setExportName('');
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported.data && imported.version) {
          setHierarchy(imported.data);
          
          if (!versionHistory.some(v => v.exportDate === imported.exportDate)) {
            setVersionHistory(prev => [...prev, imported]);
          }
          
          alert('Daten erfolgreich importiert!');
        } else {
          alert('Ungültiges Dateiformat. Bitte wählen Sie eine gültige Export-Datei.');
        }
      } catch (error) {
        alert('Fehler beim Laden der Datei: ' + error.message);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const restoreVersion = (version) => {
    if (window.confirm(`Möchten Sie die Version "${version.name}" vom ${version.exportDateFormatted} wiederherstellen?`)) {
      setHierarchy(version.data);
      setVersionModalOpen(false);
      alert('Version erfolgreich wiederhergestellt!');
    }
  };

  const deleteVersion = (index) => {
    if (window.confirm('Möchten Sie diese Version aus der Historie löschen?')) {
      setVersionHistory(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleAddCategoryFromModal = () => {
    if (!newCategoryName || !newCategoryName.trim() || !addCategoryArea) return;
    
    setHierarchy(prev => {
      const newHierarchy = JSON.parse(JSON.stringify(prev));
      
      newHierarchy[addCategoryArea].categories[newCategoryName] = {
        name: newCategoryName,
        benchmark: 0,
        ist: 0,
        description: '',
        children: {},
        isCustom: true
      };
      
      return newHierarchy;
    });
    
    const pathKey = `${addCategoryArea}_${newCategoryName}`;
    setExpandedItems(prev => ({ ...prev, [pathKey]: true }));
    
    setNewCategoryName('');
    setAddCategoryModalOpen(false);
    setAddCategoryArea(null);
  };

  const renderItem = (item, area, catKey, path = [], level = 3) => {
    const itemPath = [...path, item.name];
    const pathKey = `${area}_${catKey}_${itemPath.join('_')}`;
    const isExpanded = expandedItems[pathKey];
    const hasChildren = item.children && Object.keys(item.children).length > 0;
    const indent = (level - 3) * 8;
    const isEditing = editingItem === pathKey;

    return (
      <div key={pathKey} style={{ marginLeft: `${indent}px` }}>
        <div className="bg-white rounded px-1.5 py-0.5 flex items-center gap-1.5 hover:bg-blue-50 transition-colors mb-0.5 group">
          {hasChildren ? (
            <button
              onClick={() => toggleExpand(pathKey)}
              className="flex-shrink-0 p-0 hover:bg-slate-200 rounded"
            >
              {isExpanded ? 
                <ChevronDown className="w-3 h-3 text-slate-600" /> : 
                <ChevronRight className="w-3 h-3 text-slate-600" />
              }
            </button>
          ) : (
            <div className="w-3" />
          )}
          
          {isEditing ? (
            <input
              type="text"
              defaultValue={item.name}
              autoFocus
              onBlur={(e) => renameItem(area, catKey, itemPath, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  renameItem(area, catKey, itemPath, e.target.value);
                } else if (e.key === 'Escape') {
                  setEditingItem(null);
                }
              }}
              className="flex-1 min-w-0 text-xs text-slate-700 px-1 py-0.5 border border-blue-500 rounded outline-none"
            />
          ) : (
            <>
              <div 
                className="flex-1 min-w-0 text-xs text-slate-700 truncate cursor-pointer"
                onDoubleClick={() => setEditingItem(pathKey)}
                title="Doppelklick zum Bearbeiten"
              >
                {item.name}
              </div>
              
              {item.isCustom && (
                <button
                  onClick={() => deleteItem(area, catKey, itemPath)}
                  className="flex-shrink-0 p-0.5 hover:bg-red-100 rounded text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Löschen"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
              
              <button
                onClick={() => {
                  setSelectedProcess({ area, catKey, item, path: itemPath });
                  setDetailModalOpen(true);
                  setActiveTab('beschreibung');
                }}
                className="flex-shrink-0 p-0.5 hover:bg-blue-100 rounded text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Details bearbeiten"
              >
                <FileText className="w-3 h-3" />
              </button>
              
              {hasChildren && (
                <button
                  onClick={() => {
                    const name = window.prompt('Name des neuen Unterprozesses:');
                    if (name && name.trim()) {
                      setHierarchy(prev => {
                        const newHierarchy = JSON.parse(JSON.stringify(prev));
                        let target = newHierarchy[area].categories[catKey];
                        for (let i = 0; i < itemPath.length; i++) {
                          if (target.children && target.children[itemPath[i]]) {
                            target = target.children[itemPath[i]];
                          }
                        }
                        if (!target.children) {
                          target.children = {};
                          target.isLeaf = false;
                        }
                        target.children[name] = {
                          name: name,
                          ist: 0,
                          isLeaf: true,
                          isCustom: true
                        };
                        return newHierarchy;
                      });
                      setExpandedItems(prev => ({ ...prev, [pathKey]: true }));
                    }
                  }}
                  className="flex-shrink-0 p-0.5 hover:bg-green-100 rounded text-green-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Neuen Unterprozess hinzufügen"
                >
                  <Plus className="w-3 h-3" />
                </button>
              )}
            </>
          )}
          
          <input
            type="range"
            min="0"
            max={hasChildren ? "50" : "20"}
            step="0.1"
            value={item.ist || 0}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              updateItemValue(area, catKey, itemPath, e.target.value);
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="w-14 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-activity flex-shrink-0"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(item.ist / (hasChildren ? 50 : 20)) * 100}%, #e2e8f0 ${(item.ist / (hasChildren ? 50 : 20)) * 100}%, #e2e8f0 100%)`
            }}
          />
          
          <input
            type="text"
            inputMode="decimal"
            value={item.ist || ''}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9.]/g, '');
              updateItemValue(area, catKey, itemPath, val);
            }}
            onFocus={(e) => e.target.select()}
            className="w-7 px-0.5 py-0 border border-slate-300 focus:border-blue-500 rounded text-center text-xs outline-none flex-shrink-0"
            placeholder="0"
          />
          <span className="text-xs text-slate-500 w-2 flex-shrink-0">%</span>
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-1 space-y-0.5 mt-0.5">
            {Object.values(item.children).map(child => 
              renderItem(child, area, catKey, itemPath, level + 1)
            )}
            
            <div className="flex gap-1 mt-1 pl-3">
              <input
                type="text"
                value={newActivityText[pathKey] || ''}
                onChange={(e) => setNewActivityText(prev => ({
                  ...prev,
                  [pathKey]: e.target.value
                }))}
                placeholder="Neuer Unterprozess..."
                className="flex-1 px-1.5 py-0.5 border border-slate-300 focus:border-blue-500 rounded text-xs outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addNewItem(area, catKey, itemPath);
                  }
                }}
              />
              <button
                onClick={() => addNewItem(area, catKey, itemPath)}
                disabled={!newActivityText[pathKey]?.trim()}
                className={`px-1.5 py-0.5 rounded text-xs font-medium flex items-center gap-1 ${
                  newActivityText[pathKey]?.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCategoryColumn = (area, areaColor) => {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 pb-2 border-b-2" style={{ borderColor: areaColor }}>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: areaColor }} />
            <h3 className="text-lg font-bold text-slate-800">{hierarchy[area].name}</h3>
          </div>
          <button
            onClick={() => {
              setAddCategoryArea(area);
              setNewCategoryName('');
              setAddCategoryModalOpen(true);
            }}
            className="p-1 hover:bg-slate-200 rounded transition-colors"
            title="Neue Kategorie hinzufügen"
          >
            <Plus className="w-4 h-4" style={{ color: areaColor }} />
          </button>
        </div>
        
        {Object.keys(hierarchy[area].categories).map(catKey => {
          const cat = hierarchy[area].categories[catKey];
          const pathKey = `${area}_${catKey}`;
          const isExpanded = expandedItems[pathKey];
          const hasChildren = cat.children && Object.keys(cat.children).length > 0;
          const isEditing = editingItem === pathKey;
          
          return (
            <div key={catKey} className="border border-slate-200 rounded-lg overflow-hidden group">
              <div className="px-2 py-1 bg-slate-50 flex items-center gap-2">
                <button
                  onClick={() => toggleExpand(pathKey)}
                  className="flex-shrink-0 p-0.5 hover:bg-slate-200 rounded transition-colors"
                >
                  {isExpanded ? 
                    <ChevronDown className="w-3 h-3 text-slate-600" /> : 
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                  }
                </button>
                
                <div className="flex items-center gap-1 flex-1 min-w-0">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: areaColor }} />
                  
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={cat.name}
                      autoFocus
                      onBlur={(e) => renameItem(area, catKey, [], e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          renameItem(area, catKey, [], e.target.value);
                        } else if (e.key === 'Escape') {
                          setEditingItem(null);
                        }
                      }}
                      className="flex-1 min-w-0 text-xs font-semibold text-slate-800 px-1 py-0.5 border border-blue-500 rounded outline-none"
                    />
                  ) : (
                    <div 
                      className="font-semibold text-xs text-slate-800 truncate flex-1 cursor-pointer"
                      onDoubleClick={() => setEditingItem(pathKey)}
                      title="Doppelklick zum Bearbeiten"
                    >
                      {cat.name}
                    </div>
                  )}
                  
                  <div 
                    className="relative flex-shrink-0"
                    onMouseEnter={() => setHoveredInfo(pathKey)}
                    onMouseLeave={() => setHoveredInfo(null)}
                  >
                    <HelpCircle className="w-3 h-3 text-slate-400 cursor-help" />
                    {hoveredInfo === pathKey && cat.description && (
                      <div className="absolute left-0 top-4 bg-slate-800 text-white text-xs rounded-lg p-2 shadow-lg z-20 w-48">
                        {cat.description}
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedProcess({ area, catKey, cat, path: [] });
                      setDetailModalOpen(true);
                    }}
                    className="flex-shrink-0 p-0.5 hover:bg-blue-100 rounded text-blue-600 transition-opacity"
                    title="Details bearbeiten"
                  >
                    <FileText className="w-3 h-3" />
                  </button>
                  
                  <button
                    onClick={() => deleteItem(area, catKey, [])}
                    className="flex-shrink-0 p-0.5 hover:bg-red-100 rounded text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Kategorie löschen"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="0.5"
                    value={cat.ist || 0}
                    onChange={(e) => updateCategoryValue(area, catKey, e.target.value)}
                    className="w-20 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer slider flex-shrink-0"
                    style={{
                      background: `linear-gradient(to right, ${areaColor} 0%, ${areaColor} ${(cat.ist / 50) * 100}%, #e2e8f0 ${(cat.ist / 50) * 100}%, #e2e8f0 100%)`
                    }}
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    value={cat.ist || ''}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9.]/g, '');
                      updateCategoryValue(area, catKey, val);
                    }}
                    onFocus={(e) => e.target.select()}
                    className="w-8 px-1 py-0 border border-slate-300 focus:border-blue-500 rounded text-center font-semibold text-xs outline-none flex-shrink-0"
                    placeholder="0"
                  />
                  <span className="text-xs text-slate-500 flex-shrink-0">%</span>
                </div>
              </div>

              {isExpanded && (
                <div className="bg-gradient-to-b from-blue-50 to-slate-50 border-t border-slate-200 px-2 py-1 max-h-96 overflow-y-auto">
                  {hasChildren && (
                    <div className="space-y-0.5 mb-2">
                      {Object.values(cat.children).map(child => 
                        renderItem(child, area, catKey, [], 3)
                      )}
                    </div>
                  )}
                  
                  {!hasChildren && (
                    <div className="text-center py-2 text-slate-500 text-xs">
                      Noch keine Prozesse vorhanden
                    </div>
                  )}
                  
                  <div className="flex gap-1 mt-2 pt-2 border-t border-slate-200">
                    <input
                      type="text"
                      value={newActivityText[`${area}_${catKey}`] || ''}
                      onChange={(e) => setNewActivityText(prev => ({
                        ...prev,
                        [`${area}_${catKey}`]: e.target.value
                      }))}
                      placeholder="Neuen Prozess hinzufügen..."
                      className="flex-1 px-2 py-1 border border-slate-300 focus:border-blue-500 rounded text-xs outline-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addNewItem(area, catKey, []);
                        }
                      }}
                    />
                    <button
                      onClick={() => addNewItem(area, catKey, [])}
                      disabled={!newActivityText[`${area}_${catKey}`]?.trim()}
                      className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${
                        newActivityText[`${area}_${catKey}`]?.trim()
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <Plus className="w-3 h-3" />
                      Hinzufügen
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const getComparison = () => {
    if (!hierarchy) return [];
    const comparison = [];
    
    ['produktiv', 'verwaltung'].forEach(area => {
      Object.keys(hierarchy[area].categories).forEach(catKey => {
        const cat = hierarchy[area].categories[catKey];
        if (cat.ist > 0 || cat.benchmark > 0) {
          comparison.push({
            name: cat.name,
            ist: cat.ist,
            benchmark: cat.benchmark,
            diff: cat.ist - cat.benchmark,
            area: hierarchy[area].name
          });
        }
      });
    });
    
    return comparison.sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));
  };

  const getRadarData = () => {
    if (!hierarchy) return [];
    const data = [];
    
    ['produktiv', 'verwaltung'].forEach(area => {
      Object.keys(hierarchy[area].categories).forEach(catKey => {
        const cat = hierarchy[area].categories[catKey];
        if (cat.ist > 0 || cat.benchmark > 0) {
          data.push({
            category: cat.name.substring(0, 15),
            ist: cat.ist,
            benchmark: cat.benchmark
          });
        }
      });
    });
    
    return data;
  };

  if (!hierarchy) {
    return <div className="flex items-center justify-center h-screen">
      <div className="text-xl text-slate-600">Lade Daten...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-slate-800">Kanzlei-Prozessanalyse</h1>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                  PROTOTYP
                </span>
              </div>
              <p className="text-slate-600">
                Vergleichen Sie Ihre Zeitverteilung mit Erfahrungswerten aus der Branche
              </p>
            </div>
            
            <div className="flex gap-2 ml-4">
              <input
                type="file"
                id="import-file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
              <button
                onClick={() => setVersionModalOpen(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
                title="Versionshistorie"
              >
                <Clock className="w-4 h-4" />
                Versionen ({versionHistory.length})
              </button>
              <button
                onClick={() => document.getElementById('import-file').click()}
                className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
                title="Daten importieren"
              >
                <ArrowRight className="w-4 h-4 transform rotate-180" />
                Importieren
              </button>
              <button
                onClick={exportData}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
                title="Daten exportieren"
              >
                <FileText className="w-4 h-4" />
                Exportieren
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-slate-700">
              <strong>Hinweis:</strong> Dies ist eine Prototyp-Version mit Standard-Prozessen einer Steuerkanzlei. 
              Sie können die Werte frei anpassen und mit Branchenwerten vergleichen.
              <div className="mt-2 text-xs text-slate-600">
                💾 <strong>Tipp:</strong> Nutzen Sie "Exportieren" um Versionen zu speichern. Die Versionshistorie zeigt alle Stände.
              </div>
            </div>
          </div>
        </div>

        {currentStep === 'welcome' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                Wie möchten Sie Ihre Daten erfassen?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => {
                    setInputMethod('manual');
                    setCurrentStep('input');
                  }}
                  className="bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 hover:border-blue-400 rounded-xl p-8 text-left transition-all group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Manuelle Eingabe</h3>
                      <span className="text-sm text-green-600 font-medium">✓ Verfügbar</span>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Geben Sie Ihre Zeitverteilung Schritt für Schritt ein. Orientieren Sie sich an 
                    den vorgegebenen Benchmark-Werten oder tragen Sie Ihre eigenen Werte ein.
                  </p>
                  <div className="text-sm text-slate-500">
                    Dauer: ca. 5-10 Minuten
                  </div>
                </button>

                <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-8 text-left opacity-60 relative">
                  <div className="absolute top-4 right-4 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
                    In Entwicklung
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                      <Mic className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Sprachassistent</h3>
                      <span className="text-sm text-orange-600 font-medium">⏳ Kommt bald</span>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Sprechen Sie einfach über Ihre Prozesse. Der KI-Assistent führt Sie 
                    durch ein natürliches Gespräch und erfasst automatisch Ihre Zeitverteilung.
                  </p>
                  <div className="text-sm text-slate-500">
                    Dauer: ca. 5-7 Minuten
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'input' && inputMethod === 'manual' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-slate-800">Erfassungsfortschritt</h3>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${Math.abs(getOverallTotal() - 100) < 5 ? 'text-green-600' : 'text-orange-600'}`}>
                    {getOverallTotal().toFixed(0)}%
                  </div>
                  <div className="text-xs text-slate-500">von 100%</div>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 mb-2">
                <div 
                  className={`h-4 rounded-full transition-all ${
                    Math.abs(getOverallTotal() - 100) < 5 ? 'bg-green-500' : 
                    getOverallTotal() > 100 ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(100, getOverallTotal())}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Mandantenauftrag: {calculateAreaTotal('produktiv').toFixed(0)}%</span>
                <span>Verwaltungsauftrag: {calculateAreaTotal('verwaltung').toFixed(0)}%</span>
                <span>Noch: {Math.max(0, 100 - getOverallTotal()).toFixed(0)}%</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 border border-green-300 rounded-lg px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                    <span className="text-sm font-semibold text-slate-800">Mandantenauftrag</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-green-700">{calculateAreaTotal('produktiv').toFixed(1)}</span>
                    <span className="text-sm text-slate-500">%</span>
                  </div>
                </div>
                
                <div className="bg-orange-50 border border-orange-300 rounded-lg px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
                    <span className="text-sm font-semibold text-slate-800">Verwaltungsauftrag</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-orange-700">{calculateAreaTotal('verwaltung').toFixed(1)}</span>
                    <span className="text-sm text-slate-500">%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                {renderCategoryColumn('produktiv', '#10b981')}
                {renderCategoryColumn('verwaltung', '#f59e0b')}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center">
              <div>
                <div className="text-sm text-slate-500 mb-1">Gesamt erfasst</div>
                <div className="text-3xl font-bold text-slate-800">
                  {getOverallTotal().toFixed(1)}%
                </div>
              </div>
              <button
                onClick={() => setCurrentStep('results')}
                disabled={getOverallTotal() === 0}
                className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 ${
                  getOverallTotal() > 0
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                Auswertung anzeigen
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 'results' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <div className="text-sm text-slate-500">Mandantenauftrag</div>
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">
                  {calculateAreaTotal('produktiv').toFixed(1)}%
                </div>
                <div className="text-sm text-slate-600">
                  Benchmark: ~35%
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                  <div className="text-sm text-slate-500">Verwaltungsauftrag</div>
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">
                  {calculateAreaTotal('verwaltung').toFixed(1)}%
                </div>
                <div className="text-sm text-slate-600">
                  Benchmark: ~65%
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                  <div className="text-sm text-slate-500">Abweichung gesamt</div>
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">
                  {Math.abs(getOverallTotal() - 100).toFixed(1)}%
                </div>
                <div className="text-sm text-slate-600">
                  {Math.abs(getOverallTotal() - 100) < 5 ? '✓ Im Rahmen' : '⚠️ Prüfen empfohlen'}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Ist-Soll-Vergleich nach Kategorien</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={getRadarData()}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 25]} />
                  <Radar name="Ihre Verteilung" dataKey="ist" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                  <Radar name="Benchmark" dataKey="benchmark" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Vergleich aller Kategorien</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={getComparison()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={120} fontSize={11} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ist" fill="#3b82f6" name="Ihre Verteilung (%)" />
                  <Bar dataKey="benchmark" fill="#10b981" name="Benchmark (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep('input')}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-3 rounded-lg font-bold"
              >
                Werte anpassen
              </button>
              <button
                onClick={exportData}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Auswertung exportieren
              </button>
            </div>
          </div>
        )}
      </div>

      {detailModalOpen && selectedProcess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-slate-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {selectedProcess.item?.name || selectedProcess.cat?.name}
                  </h2>
                  <p className="text-sm text-slate-600">Prozessdetails bearbeiten</p>
                </div>
                <button
                  onClick={() => setDetailModalOpen(false)}
                  className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <ArrowRight className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {[
                  { id: 'beschreibung', label: 'Beschreibung', icon: FileText },
                  { id: 'visualisierung', label: 'Visualisierung', icon: BarChart3 },
                  { id: 'soll', label: 'Soll-Zustand', icon: TrendingUp },
                  { id: 'huerden', label: 'Hürden', icon: AlertCircle },
                  { id: 'bewertung', label: 'Aufwand/Nutzen', icon: BarChart3 },
                  { id: 'anbieter', label: 'Anbieter', icon: FileText }
                ].map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'beschreibung' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Prozessbeschreibung (IST-Zustand)
                    </label>
                    <textarea
                      value={getProcessDetails(getCurrentProcess()).beschreibung}
                      onChange={(e) => {
                        updateProcessDetails(
                          selectedProcess.area,
                          selectedProcess.catKey,
                          selectedProcess.path || [],
                          'beschreibung',
                          e.target.value
                        );
                      }}
                      placeholder="Beschreiben Sie den aktuellen Prozess detailliert..."
                      rows={8}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 outline-none text-sm"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'visualisierung' && (
                <div className="space-y-4">
                  <div className="flex justify-end gap-2 mb-4">
                    <button
                      onClick={() => setMermaidView('grafik')}
                      className={`px-3 py-1 rounded text-sm ${
                        mermaidView === 'grafik'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      Grafik
                    </button>
                    <button
                      onClick={() => setMermaidView('code')}
                      className={`px-3 py-1 rounded text-sm ${
                        mermaidView === 'code'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      Code
                    </button>
                  </div>

                  {mermaidView === 'code' ? (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Mermaid Code
                      </label>
                      <textarea
                        value={getProcessDetails(getCurrentProcess()).mermaidCode}
                        onChange={(e) => {
                          updateProcessDetails(
                            selectedProcess.area,
                            selectedProcess.catKey,
                            selectedProcess.path || [],
                            'mermaidCode',
                            e.target.value
                          );
                        }}
                        placeholder={`sequenceDiagram\n    participant M as Mandant\n    participant S as Sachbearbeiter\n    participant D as DATEV\n    M->>S: Unterlagen bereitstellen\n    S->>D: Daten erfassen\n    D-->>S: Plausibilitätsprüfung\n    S->>M: Entwurf zur Freigabe`}
                        rows={12}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 outline-none text-sm font-mono"
                      />
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                      <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                      <p className="text-slate-600 mb-2">Mermaid-Vorschau</p>
                      <p className="text-xs text-slate-500">
                        Die grafische Darstellung des Mermaid-Codes würde hier erscheinen
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Beteiligte Systeme
                      </label>
                      <textarea
                        value={getProcessDetails(getCurrentProcess()).systeme}
                        onChange={(e) => {
                          updateProcessDetails(
                            selectedProcess.area,
                            selectedProcess.catKey,
                            selectedProcess.path || [],
                            'systeme',
                            e.target.value
                          );
                        }}
                        placeholder="DATEV, DMS, Outlook..."
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Stakeholder / Beteiligte
                      </label>
                      <textarea
                        value={getProcessDetails(getCurrentProcess()).stakeholder}
                        onChange={(e) => {
                          updateProcessDetails(
                            selectedProcess.area,
                            selectedProcess.catKey,
                            selectedProcess.path || [],
                            'stakeholder',
                            e.target.value
                          );
                        }}
                        placeholder="Mandant, Sachbearbeiter, Steuerberater..."
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'soll' && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Soll-Zustand (Zukünftiger Prozess)
                  </label>
                  <textarea
                    value={getProcessDetails(getCurrentProcess()).soll}
                    onChange={(e) => {
                      updateProcessDetails(
                        selectedProcess.area,
                        selectedProcess.catKey,
                        selectedProcess.path || [],
                        'soll',
                        e.target.value
                      );
                    }}
                    placeholder="Beschreiben Sie den gewünschten zukünftigen Zustand des Prozesses..."
                    rows={10}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 outline-none text-sm"
                  />
                </div>
              )}

              {activeTab === 'huerden' && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Hürden / Barrieren
                  </label>
                  <textarea
                    value={getProcessDetails(getCurrentProcess()).huerden}
                    onChange={(e) => {
                      updateProcessDetails(
                        selectedProcess.area,
                        selectedProcess.catKey,
                        selectedProcess.path || [],
                        'huerden',
                        e.target.value
                      );
                    }}
                    placeholder="Welche Herausforderungen gibt es bei der Optimierung dieses Prozesses?"
                    rows={10}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 outline-none text-sm"
                  />
                </div>
              )}

              {activeTab === 'bewertung' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Aufwand (0 = gering, 4 = hoch)
                      </label>
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="0"
                          max="4"
                          step="0.5"
                          value={getProcessDetails(getCurrentProcess()).aufwand}
                          onChange={(e) => updateProcessDetails(
                            selectedProcess.area,
                            selectedProcess.catKey,
                            selectedProcess.path || [],
                            'aufwand',
                            parseFloat(e.target.value)
                          )}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-range"
                        />
                        <div className="text-center">
                          <span className="text-2xl font-bold text-slate-800">
                            {getProcessDetails(getCurrentProcess()).aufwand.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Nutzen (0 = gering, 4 = hoch)
                      </label>
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="0"
                          max="4"
                          step="0.5"
                          value={getProcessDetails(getCurrentProcess()).nutzen}
                          onChange={(e) => updateProcessDetails(
                            selectedProcess.area,
                            selectedProcess.catKey,
                            selectedProcess.path || [],
                            'nutzen',
                            parseFloat(e.target.value)
                          )}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-range"
                        />
                        <div className="text-center">
                          <span className="text-2xl font-bold text-slate-800">
                            {getProcessDetails(getCurrentProcess()).nutzen.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-4 bg-gradient-to-br from-slate-900 to-slate-800">
                    <div className="text-sm text-white mb-3 font-bold text-center text-lg">
                      Prozess-Potenziale erschließen - Optimierungspotenzial
                    </div>
                    
                    <div className="relative" style={{ height: '400px' }}>
                      <div className="absolute inset-0 grid grid-cols-9 grid-rows-9 gap-0">
                        {Array.from({ length: 81 }).map((_, idx) => {
                          const row = Math.floor(idx / 9);
                          const col = idx % 9;
                          const nutzenValue = (8 - row) * 0.5;
                          const aufwandValue = col * 0.5;
                          
                          const potential = nutzenValue - aufwandValue;
                          let color;
                          if (potential >= 3) color = 'rgb(34, 197, 94)';
                          else if (potential >= 2.5) color = 'rgb(74, 222, 128)';
                          else if (potential >= 2) color = 'rgb(134, 239, 172)';
                          else if (potential >= 1.5) color = 'rgb(187, 247, 208)';
                          else if (potential >= 1) color = 'rgb(187, 196, 73)';
                          else if (potential >= 0.5) color = 'rgb(234, 179, 8)';
                          else if (potential >= 0) color = 'rgb(251, 146, 60)';
                          else if (potential >= -0.5) color = 'rgb(248, 113, 113)';
                          else color = 'rgb(239, 68, 68)';
                          
                          const currentAufwand = getProcessDetails(getCurrentProcess()).aufwand;
                          const currentNutzen = getProcessDetails(getCurrentProcess()).nutzen;
                          
                          const isCurrentPosition = 
                            Math.abs(aufwandValue - currentAufwand) < 0.3 && 
                            Math.abs(nutzenValue - currentNutzen) < 0.3;
                          
                          return (
                            <div
                              key={idx}
                              style={{
                                backgroundColor: color,
                                border: isCurrentPosition ? '3px solid white' : 'none',
                                boxShadow: isCurrentPosition ? '0 0 10px rgba(255,255,255,0.8)' : 'none'
                              }}
                            />
                          );
                        })}
                      </div>
                      
                      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-white text-sm font-semibold pr-2" style={{ width: '80px', transform: 'translateX(-85px)' }}>
                        <div className="text-center">hoch</div>
                        <div className="text-center transform -rotate-90 origin-center" style={{ marginTop: '80px', marginBottom: '80px' }}>Aufwand</div>
                        <div className="text-center">gering</div>
                      </div>
                      
                      <div className="absolute left-0 right-0 bottom-0 flex justify-between text-white text-sm font-semibold pt-2" style={{ height: '60px', transform: 'translateY(65px)' }}>
                        <div>gering</div>
                        <div className="font-bold text-lg">Nutzen</div>
                        <div>hoch</div>
                      </div>
                    </div>
                    
                    <div className="text-center mt-16 pt-4 border-t border-slate-600">
                      <span className="text-sm font-semibold text-white">
                        Empfehlung: {
                          getProcessDetails(getCurrentProcess()).nutzen >= 3 &&
                          getProcessDetails(getCurrentProcess()).aufwand <= 1.5
                            ? '🟢 Schnell umsetzen (Quick Win)'
                            : getProcessDetails(getCurrentProcess()).nutzen >= 3
                            ? '🟡 Strategisches Projekt'
                            : getProcessDetails(getCurrentProcess()).aufwand >= 3
                            ? '🔴 Überdenken'
                            : '⚪ Niedrige Priorität'
                        }
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Priorität (1 = niedrig, 10 = hoch)
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={getProcessDetails(getCurrentProcess()).prioritaet}
                        onChange={(e) => updateProcessDetails(
                          selectedProcess.area,
                          selectedProcess.catKey,
                          selectedProcess.path || [],
                          'prioritaet',
                          parseInt(e.target.value)
                        )}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-range"
                      />
                      <div className="text-center">
                        <span className="text-2xl font-bold text-slate-800">
                          {getProcessDetails(getCurrentProcess()).prioritaet}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Notizen
                    </label>
                    <textarea
                      value={getProcessDetails(getCurrentProcess()).notizen}
                      onChange={(e) => {
                        updateProcessDetails(
                          selectedProcess.area,
                          selectedProcess.catKey,
                          selectedProcess.path || [],
                          'notizen',
                          e.target.value
                        );
                      }}
                      placeholder="Zusätzliche Notizen zur Bewertung..."
                      rows={4}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 outline-none text-sm"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'anbieter' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-semibold text-slate-700">
                      Anbieter / Lösungsanbieter
                    </label>
                    <button
                      onClick={() => {
                        const anbieter = getProcessDetails(getCurrentProcess()).anbieter || [];
                        updateProcessDetails(
                          selectedProcess.area,
                          selectedProcess.catKey,
                          selectedProcess.path || [],
                          'anbieter',
                          [...anbieter, { name: '', url: '', notiz: '' }]
                        );
                      }}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Anbieter hinzufügen
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(getProcessDetails(getCurrentProcess()).anbieter || []).map((anbieter, index) => (
                      <div key={index} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <input
                            type="text"
                            value={anbieter.name || ''}
                            onChange={(e) => {
                              const anbieterList = [...(getProcessDetails(getCurrentProcess()).anbieter || [])];
                              anbieterList[index] = { ...anbieterList[index], name: e.target.value };
                              updateProcessDetails(
                                selectedProcess.area,
                                selectedProcess.catKey,
                                selectedProcess.path || [],
                                'anbieter',
                                anbieterList
                              );
                            }}
                            placeholder="Anbietername"
                            className="px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 outline-none text-sm"
                          />
                          <input
                            type="text"
                            value={anbieter.url || ''}
                            onChange={(e) => {
                              const anbieterList = [...(getProcessDetails(getCurrentProcess()).anbieter || [])];
                              anbieterList[index] = { ...anbieterList[index], url: e.target.value };
                              updateProcessDetails(
                                selectedProcess.area,
                                selectedProcess.catKey,
                                selectedProcess.path || [],
                                'anbieter',
                                anbieterList
                              );
                            }}
                            placeholder="https://..."
                            className="px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 outline-none text-sm"
                          />
                        </div>
                        <textarea
                          value={anbieter.notiz || ''}
                          onChange={(e) => {
                            const anbieterList = [...(getProcessDetails(getCurrentProcess()).anbieter || [])];
                            anbieterList[index] = { ...anbieterList[index], notiz: e.target.value };
                            updateProcessDetails(
                              selectedProcess.area,
                              selectedProcess.catKey,
                              selectedProcess.path || [],
                              'anbieter',
                              anbieterList
                            );
                          }}
                          placeholder="Notizen zu diesem Anbieter..."
                          rows={2}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 outline-none text-sm"
                        />
                        <button
                          onClick={() => {
                            const anbieterList = (getProcessDetails(getCurrentProcess()).anbieter || []).filter((_, i) => i !== index);
                            updateProcessDetails(
                              selectedProcess.area,
                              selectedProcess.catKey,
                              selectedProcess.path || [],
                              'anbieter',
                              anbieterList
                            );
                          }}
                          className="mt-2 text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          Entfernen
                        </button>
                      </div>
                    ))}

                    {(!getProcessDetails(getCurrentProcess()).anbieter || 
                      getProcessDetails(getCurrentProcess()).anbieter.length === 0) && (
                      <div className="text-center py-8 text-slate-500">
                        Noch keine Anbieter hinzugefügt
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3 bg-slate-50">
              <button
                onClick={() => setDetailModalOpen(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-700 font-medium transition-colors"
              >
                Schließen
              </button>
              <button
                onClick={() => setDetailModalOpen(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}

      {addCategoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-slate-50">
              <h2 className="text-xl font-bold text-slate-800">
                Neue Kategorie hinzufügen
              </h2>
              <p className="text-sm text-slate-600">
                {addCategoryArea === 'produktiv' ? 'Mandantenauftrag' : 'Verwaltungsauftrag'}
              </p>
            </div>

            <div className="p-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Kategoriename
              </label>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddCategoryFromModal();
                  } else if (e.key === 'Escape') {
                    setAddCategoryModalOpen(false);
                    setNewCategoryName('');
                  }
                }}
                placeholder="z.B. Digitalisierung"
                autoFocus
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 outline-none text-sm"
              />
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3 bg-slate-50">
              <button
                onClick={() => {
                  setAddCategoryModalOpen(false);
                  setNewCategoryName('');
                  setAddCategoryArea(null);
                }}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-700 font-medium transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleAddCategoryFromModal}
                disabled={!newCategoryName?.trim()}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  newCategoryName?.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                Hinzufügen
              </button>
            </div>
          </div>
        </div>
      )}

      {exportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-slate-50">
              <h2 className="text-xl font-bold text-slate-800">Daten exportieren</h2>
              <p className="text-sm text-slate-600">Version speichern</p>
            </div>

            <div className="p-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Versionsname
              </label>
              <input
                type="text"
                value={exportName}
                onChange={(e) => setExportName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    executeExport();
                  } else if (e.key === 'Escape') {
                    setExportModalOpen(false);
                    setExportName('');
                  }
                }}
                placeholder="z.B. Q4 2024 Stand"
                autoFocus
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 outline-none text-sm"
              />
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3 bg-slate-50">
              <button
                onClick={() => {
                  setExportModalOpen(false);
                  setExportName('');
                }}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-700 font-medium transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={executeExport}
                disabled={!exportName?.trim()}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  exportName?.trim()
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                Exportieren
              </button>
            </div>
          </div>
        </div>
      )}

      {versionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-purple-50 to-slate-50">
              <h2 className="text-xl font-bold text-slate-800">Versionshistorie</h2>
              <p className="text-sm text-slate-600">{versionHistory.length} gespeicherte Versionen</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {versionHistory.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                  <p>Noch keine Versionen gespeichert</p>
                  <p className="text-sm mt-2">Nutzen Sie "Exportieren" um Versionen zu speichern</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {versionHistory.map((version, index) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800">{version.name}</h3>
                          <p className="text-sm text-slate-600 mt-1">{version.exportDateFormatted}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => restoreVersion(version)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                          >
                            Wiederherstellen
                          </button>
                          <button
                            onClick={() => deleteVersion(index)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                          >
                            Löschen
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex justify-end bg-slate-50">
              <button
                onClick={() => setVersionModalOpen(false)}
                className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: currentColor;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: currentColor;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .slider-activity::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }
        .slider-activity::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }
        .slider-range::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .slider-range::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};

export default TaxProcessAnalyzer;

  
};

export default TaxProcessAnalyzer;
