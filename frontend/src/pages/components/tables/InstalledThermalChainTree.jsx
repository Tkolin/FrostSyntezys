import { SettingOutlined } from '@ant-design/icons'
import { gql, useQuery } from '@apollo/client'
import { Button, Modal, Space, Tree } from 'antd'
import React, { useMemo, useState } from 'react'
import HasRole from '../components/HasRole'
import InstalledThermalChainForm from '../forms/InstalledThermalChainForm'

// Запрос берёт сразу всё дерево локаций и их термокос
export const GET_LOCATIONS_TREE = gql`
  query GetLocationsTree {
    Locations {
      id
      name
      sub_locations {
        id
        name
        sub_locations {
          id
          name
          # можно глубже, если нужна
          sub_locations {
            id
            name
          }
          installed_thermistor_chains {
            id
            thermistor_chain { name }
          }
        }
      }
      installed_thermistor_chains {
        id
        thermistor_chain { name }
      }
    }
  }
`

const InstalledThermalChainTree = () => {
  const { data, loading, error, refetch } = useQuery(GET_LOCATIONS_TREE)
  const [modalEditId, setModalEditId] = useState(null)

  // Преобразуем Locations в формат treeData для <Tree>
  const treeData = useMemo(() => {
    if (!data?.Locations) return []

    const mapChains = chains =>
      (chains || []).map(chain => ({
        key: `chain-${chain.id}`,
        title: (
          <Space>
            <span>🌡 {chain.thermistor_chain.name}</span>
            <HasRole roles={['CHIEF_ENGINEER']}>
              <Button
                type="text"
                size="small"
                icon={<SettingOutlined />}
                onClick={e => {
                  e.stopPropagation()
                  setModalEditId(chain.id)
                }}
              />
            </HasRole>
          </Space>
        ),
        isLeaf: true,
      }))

    const mapLocations = locs =>
      (locs || []).map(loc => ({
        key: `loc-${loc.id}`,
        title: <b>📂 {loc.name}</b>,
        children: [
          ...mapChains(loc.installed_thermistor_chains),
          ...mapLocations(loc.sub_locations),
        ],
      }))

    return mapLocations(data.Locations)
  }, [data])

  const onSelect = (selectedKeys, info) => {
    // Если пользователь кликает по узлу-термокосе (leaf), открываем форму
    const key = selectedKeys[0]
    if (key?.startsWith('chain-')) {
      setModalEditId(key.replace('chain-', ''))
    }
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Tree
        showIcon={false}
        treeData={treeData}
        loading={loading}
        selectable
        onSelect={onSelect}
        defaultExpandAll
      />
      <Modal
        footer={null}
        open={!!modalEditId}
        onCancel={() => setModalEditId(null)}
        title="Управление термокосой"
      >
        <InstalledThermalChainForm
          id={modalEditId}
          onCompleted={() => {
            refetch()
            setModalEditId(null)
          }}
        />
      </Modal>
      {error && <div style={{ color: 'red' }}>{error.message}</div>}
    </Space>
  )
}

export default InstalledThermalChainTree
