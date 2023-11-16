import {
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '@/constants/colors';
import { ChevronDown, Close, Filter, Search, Sort } from '@/constants/icons';
import { Button } from '@/components/atom';
import { InputLabel } from '@/components/atom/Input';
import DropDownPicker from 'react-native-dropdown-picker';
import { publicAPI } from 'Api/backend';
import { EmptyState } from '../History';
import { ReportCard } from '@/components';

DropDownPicker.setMode('BADGE');

const Complaints = () => {
  const [query, setQuery] = useState(null);
  // const [category, setCategory] = useState([]);
  // const [priority, setPriority] = useState([]);
  // const [status, setStatus] = useState([]);
  const [orderBy, setOrderBy] = useState('desc');
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'filter' | 'sort'>();
  const [categories, setCategories] = useState([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categoryId, setCategoryId] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [priorityLoading, setPriorityLoading] = useState(true);
  const [priorityId, setPriorityId] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [statusesOpen, setStatusesOpen] = useState(false);
  const [statusesLoading, setStatusesLoading] = useState(true);
  const [statusesId, setStatusesId] = useState([]);
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState('desc');
  const [sorts, setSorts] = useState([
    { label: 'Terbaru', value: 'desc' },
    { label: 'Terlama', value: 'asc' },
  ]);
  const [complaints, setComplaints] = useState<any>([]);
  const [meta, setMeta] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPriorities = async () => {
    try {
      const response = await publicAPI.get('priorities');
      const { data } = response.data;
      const priorities = data.map((priority) => ({
        label: priority.title,
        value: priority.id.toString(),
        labelStyle: {
          color: Colors[`PRIMARY_${priority.color}`],
        },
      }));

      setPriorities(priorities);
      setPriorityLoading(false);
    } catch (error) {
      setPriorityLoading(false);
      console.error('An error occurred while fetching priorities:', error.response.data);
    }
  };

  const getCategories = async () => {
    try {
      const response = await publicAPI.get('categories');
      const { data } = response.data;
      const categories = data.map((category) => ({
        label: category.title,
        value: category.id.toString(),
      }));

      setCategories(categories);
      setCategoryLoading(false);
    } catch (error) {
      setCategoryLoading(false);
      console.error('An error occurred while fetching categories:', error.response.data);
    }
  };

  const getStatuses = async () => {
    try {
      const response = await publicAPI.get('statuses');
      const { data } = response.data;
      const statuses = data.map((status) => ({
        label: status.title,
        value: status.id.toString(),
      }));

      setStatuses(statuses);
      setStatusesLoading(false);
    } catch (error) {
      setStatusesLoading(false);
      console.error('An error occurred while fetching statuses:', error.response.data);
    }
  };

  const handleData = async () => {
    setIsLoading(true);
    try {
      const params = {
        page,
        perPage,
        orderByDate: sort,
        status: statusesId.join(',') || null,
        query: query,
        category: categoryId.join(',') || null,
        priority: priorityId.join(',') || null,
      };
      console.log(params);

      const response = await publicAPI.get('complaints/search', {
        params,
      });
      const { data } = response.data;
      setComplaints(data.data);
      setMeta(data.meta);
      console.log(data);

      setIsLoading(false);
    } catch (err) {
      // setIsLoading(false);
      console.error(err);
    }
  };

  const handleSearch = async () => {
    setPage(1);
    setIsLoading(true);
    try {
      const params = {
        page,
        perPage,
        orderByDate: sort,
        status: statusesId.join(',') || null,
        query: query,
        category: categoryId.join(',') || null,
        priority: priorityId.join(',') || null,
      };
      console.log(params);

      const response = await publicAPI.get('complaints/search', {
        params,
      });
      const { data } = response.data;
      setComplaints(data.data);
      setMeta(data.meta);
      console.log(data);

      setIsLoading(false);
    } catch (err) {
      // setIsLoading(false);
      console.error(err);
    }
  };

  const handleLoadMore = async () => {
    // setIsLoading(true)
    try {
      const params = {
        page: meta.next,
        perPage,
        orderByDate: sort,
        status: statusesId.join(',') || null,
        query: query,
        category: categoryId.join(',') || null,
        priority: priorityId.join(',') || null,
      };
      console.log(params, 'params');

      const response = await publicAPI.get('complaints/search', {
        params,
      });
      const { data } = response.data;
      setComplaints([...complaints, ...data.data]);
      setMeta(data.meta);
      console.log(data);

      setIsLoading(false);
    } catch (err) {
      // setIsLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    handleData();
    getPriorities();
    getCategories();
    getStatuses();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => handleData()} />}>
      <View style={{ gap: verticalScale(10), marginBottom: 20 }}>
        <View
          style={{
            maxWidth: '100%',
            backgroundColor: 'white',
            borderColor: Colors.LINE_STROKE,
            borderWidth: 1,
            borderRadius: 14,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: scale(20),
          }}>
          <Search />
          <TextInput
            onChangeText={(text) => setQuery(text.trimEnd())}
            allowFontScaling={false}
            placeholder="Ketik untuk mencari laporan"
            style={{
              padding: moderateScale(18),
              flex: 1,
              fontFamily: 'Poppins-Medium',
              fontSize: scale(12.5),
              color: Colors.GRAY,
            }}
          />
        </View>

        <Modal animationType="slide" visible={modalOpen} transparent={true}>
          <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Choose a sticker</Text>
              <Pressable onPress={() => setModalOpen(false)}>
                <Close />
              </Pressable>
            </View>
            {modalType === 'filter' ? (
              <View>
                <InputLabel title="Skala Prioritas" />
                <DropDownPicker
                  multiple
                  min={0}
                  loading={priorityLoading}
                  listMode="SCROLLVIEW"
                  ArrowDownIconComponent={({ style }) => <ChevronDown style={style} />}
                  placeholder="Pilih Prioritas"
                  dropDownDirection="TOP"
                  style={{
                    borderWidth: 0,
                    backgroundColor: Colors.LIGHT_GRAY,
                    paddingHorizontal: moderateScale(18),
                    paddingVertical: moderateScale(18),
                    borderRadius: 14,
                    marginBottom: 12,
                    zIndex: 100,
                  }}
                  dropDownContainerStyle={{
                    borderColor: Colors.LIGHT_GRAY,
                    zIndex: 100,
                  }}
                  textStyle={{
                    color: Colors.TEXT,
                    fontFamily: 'Poppins-Medium',
                    fontSize: scale(11.5),
                  }}
                  CloseIconComponent={({ style }) => <Close style={style} />}
                  open={priorityOpen}
                  value={priorityId}
                  items={priorities}
                  setOpen={setPriorityOpen}
                  setValue={setPriorityId}
                  setItems={setPriorities}
                  showBadgeDot={true}
                  badgeDotColors={[
                    Colors.PRIMARY_YELLOW,
                    Colors.PRIMARY_RED,
                    Colors.PRIMARY_ORANGE,
                  ]}
                />

                <InputLabel title="Kategori" />
                <DropDownPicker
                  multiple
                  min={0}
                  loading={categoryLoading}
                  listMode="SCROLLVIEW"
                  ArrowDownIconComponent={({ style }) => <ChevronDown style={style} />}
                  placeholder="Pilih Kategori"
                  style={{
                    borderWidth: 0,
                    backgroundColor: Colors.LIGHT_GRAY,
                    paddingHorizontal: moderateScale(18),
                    paddingVertical: moderateScale(18),
                    borderRadius: 14,
                    marginBottom: 12,
                  }}
                  dropDownContainerStyle={{
                    borderColor: Colors.LIGHT_GRAY,
                  }}
                  textStyle={{
                    color: Colors.TEXT,
                    fontFamily: 'Poppins-Medium',
                    fontSize: scale(11.5),
                  }}
                  CloseIconComponent={({ style }) => <Close style={style} />}
                  open={categoryOpen}
                  value={categoryId}
                  items={categories}
                  setOpen={setCategoryOpen}
                  setValue={setCategoryId}
                  setItems={setCategories}
                  showBadgeDot={true}
                />

                <InputLabel title="Status" />
                <DropDownPicker
                  multiple
                  min={0}
                  loading={statusesLoading}
                  listMode="SCROLLVIEW"
                  ArrowDownIconComponent={({ style }) => <ChevronDown style={style} />}
                  placeholder="Pilih Status"
                  style={{
                    borderWidth: 0,
                    backgroundColor: Colors.LIGHT_GRAY,
                    paddingHorizontal: moderateScale(18),
                    paddingVertical: moderateScale(18),
                    borderRadius: 14,
                    marginBottom: 12,
                  }}
                  dropDownContainerStyle={{
                    borderColor: Colors.LIGHT_GRAY,
                  }}
                  textStyle={{
                    color: Colors.TEXT,
                    fontFamily: 'Poppins-Medium',
                    fontSize: scale(11.5),
                  }}
                  CloseIconComponent={({ style }) => <Close style={style} />}
                  open={statusesOpen}
                  value={statusesId}
                  items={statuses}
                  setOpen={setStatusesOpen}
                  setValue={setStatusesId}
                  setItems={setStatuses}
                  showBadgeDot={true}
                />
              </View>
            ) : (
              <>
                <InputLabel title="Urutkan" />
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  ArrowDownIconComponent={({ style }) => <ChevronDown style={style} />}
                  placeholder="Pilih Urutan"
                  style={{
                    borderWidth: 0,
                    backgroundColor: Colors.LIGHT_GRAY,
                    paddingHorizontal: moderateScale(18),
                    paddingVertical: moderateScale(18),
                    borderRadius: 14,
                    marginBottom: 12,
                  }}
                  dropDownContainerStyle={{
                    borderColor: Colors.LIGHT_GRAY,
                  }}
                  textStyle={{
                    color: Colors.TEXT,
                    fontFamily: 'Poppins-Medium',
                    fontSize: scale(11.5),
                  }}
                  CloseIconComponent={({ style }) => <Close style={style} />}
                  open={sortOpen}
                  value={sort}
                  items={sorts}
                  setOpen={setSortOpen}
                  setValue={setSort}
                  setItems={setSorts}
                />
              </>
            )}
          </View>
        </Modal>
        <View style={{ flexDirection: 'row', gap: scale(10) }}>
          <TouchableOpacity
            onPress={() => {
              setModalType('filter');
              setModalOpen(true);
            }}
            style={{
              padding: moderateScale(10),
              backgroundColor: 'white',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.LINE_STROKE,
              display: 'flex',
              flexDirection: 'row',
              gap: 8,
            }}>
            <Filter />
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: scale(11.5),
                textAlignVertical: 'center',
                verticalAlign: 'middle',
              }}>
              Filter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalType('sort');
              setModalOpen(true);
            }}
            style={{
              padding: moderateScale(10),
              backgroundColor: 'white',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.LINE_STROKE,
              display: 'flex',
              flexDirection: 'row',
              gap: 8,
            }}>
            <Sort />
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: scale(11.5),
                textAlignVertical: 'center',
                verticalAlign: 'middle',
              }}>
              Urutkan
            </Text>
          </TouchableOpacity>
        </View>
        <Button onPress={() => handleSearch()} type="Primary" size="Md" title="Cari laporan" />
      </View>
      {isLoading ? (
        <>
          <ReportCard
            blurHash="LPEyPa~V-ps.RMxuofW=x[NFRjWB"
            title="Mohon perbaiki saluran air depan SMAN 1 TAMAN"
            category="Loading"
            cover="https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/report1.jpg"
            id={1}
            place="Loading"
            status="Loading"
            statusColor={Colors.LINE_STROKE}
            time="loading"
            loading
          />
          <ReportCard
            blurHash="LPEyPa~V-ps.RMxuofW=x[NFRjWB"
            title="Mohon perbaiki saluran air depan SMAN 1 TAMAN"
            category="Loading"
            cover="https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/report1.jpg"
            id={1}
            place="Loading"
            status="Loading"
            statusColor={Colors.LINE_STROKE}
            time="loading"
            loading
          />
          <ReportCard
            blurHash="LPEyPa~V-ps.RMxuofW=x[NFRjWB"
            title="Mohon perbaiki saluran air depan SMAN 1 TAMAN"
            category="Loading"
            cover="https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/report1.jpg"
            id={1}
            place="Loading"
            status="Loading"
            statusColor={Colors.LINE_STROKE}
            time="loading"
            loading
          />
          <ReportCard
            blurHash="LPEyPa~V-ps.RMxuofW=x[NFRjWB"
            title="Mohon perbaiki saluran air depan SMAN 1 TAMAN"
            category="Loading"
            cover="https://r2.deltaconnect.yukebrillianth.my.id/assets/report/photo/report1.jpg"
            id={1}
            place="Loading"
            status="Loading"
            statusColor={Colors.LINE_STROKE}
            time="loading"
            loading
          />
        </>
      ) : complaints.length > 0 ? (
        complaints.map((complaint) => (
          <ReportCard
            blurHash={complaint?.ComplaintImages[0].placeholder}
            title={complaint?.title}
            category={complaint?.category.title}
            cover={complaint?.ComplaintImages[0].path}
            id={complaint?.id}
            place={complaint?.village}
            status={complaint?.status.title}
            statusColor={complaint?.status.color}
            time={complaint?.createdAt}
            key={complaint?.id}
          />
        ))
      ) : (
        <EmptyState title="Belum Ada Laporan" description="Belum ada laporan Masyarakat" />
      )}
      {!isLoading && meta.next && (
        <Button
          onPress={async () => {
            handleLoadMore();
          }}
          size="Md"
          title="Lebih banyak"
          type="Secondary"
        />
      )}
    </ScrollView>
  );
};

export default Complaints;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(32),
  },
  modalContent: {
    height: '55%',
    width: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  titleContainer: {
    height: '16%',
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});
