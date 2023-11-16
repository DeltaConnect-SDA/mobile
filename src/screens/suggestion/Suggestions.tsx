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

const Suggestions = () => {
  const [query, setQuery] = useState(null);
  const [category, setCategory] = useState([]);
  const [priority, setPriority] = useState([]);
  const [status, setStatus] = useState([]);
  const [orderBy, setOrderBy] = useState('desc');
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'filter' | 'sort'>();
  const [categories, setCategories] = useState([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [priorities, setPriorities] = useState([]);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [priorityLoading, setPriorityLoading] = useState(true);
  const [complaints, setComplaints] = useState<any>([]);
  const [meta, setMeta] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleData = async () => {
    setIsLoading(true);
    try {
      const params = {
        page,
        perPage,
        orderByDate: orderBy,
        status: status.join(',') || null,
        query: query,
        category: category.join(',') || null,
        priority: priority.join(',') || null,
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
        orderByDate: orderBy,
        status: status.join(',') || null,
        query: query,
        category: category.join(',') || null,
        priority: priority.join(',') || null,
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
        orderByDate: orderBy,
        status: status.join(',') || null,
        query: query,
        category: category.join(',') || null,
        priority: priority.join(',') || null,
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
                <InputLabel title="Urgensi" />
                {/* <DropDownPicker
                  loading={priorityLoading}
                  listMode="SCROLLVIEW"
                  ArrowDownIconComponent={({ style }) => <ChevronDown style={style} />}
                  placeholder="Pilih Urgensi"
                  style={{
                    borderWidth: 0,
                    backgroundColor: Colors.LIGHT_GRAY,
                    paddingHorizontal: moderateScale(18),
                    paddingVertical: moderateScale(18),
                    borderRadius: 14,
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
                  open={priorityOpen}
                  value={priorityId}
                  items={priorities}
                  setOpen={(open) =>
                    setPriorityOpen(open)
                  }
                  setValue={(callback) =>
                    this.setState((prevState) => ({
                      priorityId: callback(prevState),
                    }))
                  }
                  setItems={(callback) => this.setState((items) => ({ priorities: items }))}
                /> */}
              </View>
            ) : (
              <Text>Sort</Text>
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

export default Suggestions;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(32),
  },
  modalContent: {
    height: '30%',
    width: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
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
