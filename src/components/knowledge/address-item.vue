<template>
<div>
    <Row class="expand-row">
            <Col span="8">
                <span class="expand-key">Job: </span>
                <span class="expand-value">{{ row.name }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">Interest: </span>
                <span class="expand-value">{{ row.name }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">Birthday: </span>
                <span class="expand-value">{{ row.name }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="8">
                <span class="expand-key">Favorite book: </span>
                <span class="expand-value">《{{ row.name }}》</span>
            </Col>
            <Col span="8">
                <span class="expand-key">Favorite movie: </span>
                <span class="expand-value">{{ row.name }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">Favorite music: </span>
                <span class="expand-value">{{ row.name }}</span>
            </Col>
        </Row>
</div>
    
</template>

<script>
    export default {
        name: 'AddressItem',
        props:{
            row:{
                type:Object
            }
        },
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="less" scoped>
     .expand-row{
        margin-bottom: 16px;
    }
</style>